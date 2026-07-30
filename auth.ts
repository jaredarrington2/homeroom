// auth.ts — Auth.js v5 (next-auth@beta) config. JWT sessions, no DB adapter: account records
// live in KV via lib/accounts.ts, which is also what the admin dashboard reads.
//
// Two providers:
//   Credentials — email + password, bcrypt hashes in KV. Always on.
//   Google      — only registered when AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET are set, so the
//                 sign-in page can hide the button until those exist. Adding them later is
//                 an env-var change and a redeploy; no code moves.
//
// Construction stays lazy — importing this file without AUTH_SECRET set does not throw, and
// every call site still guards on process.env.AUTH_SECRET.
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { upsertGoogleAccount, verifyPassword } from '@/lib/accounts';

export const googleEnabled = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Email',
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      async authorize(credentials) {
        const email = typeof credentials?.email === 'string' ? credentials.email : '';
        const password = typeof credentials?.password === 'string' ? credentials.password : '';
        if (!email || !password) return null;
        const account = await verifyPassword(email, password);
        if (!account) return null;
        // `id` becomes token.sub, so the KV progress key is progress:u:{account.id}.
        return { id: account.id, email: account.email, name: account.name };
      },
    }),
    ...(googleEnabled ? [Google] : []),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  callbacks: {
    // Mirror Google users into the KV account index so /admin lists everyone, not just
    // password sign-ups. Credentials users already have a record by definition.
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.id && user.email) {
        try {
          await upsertGoogleAccount({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          });
        } catch {
          /* the index is a convenience; never block a sign-in on it */
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      return token;
    },
    // Surface the account id (token.sub) on the session so the KV key can be u:{sub}.
    session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as typeof session.user & { id?: string }).id = token.sub;
      }
      return session;
    },
  },
});
