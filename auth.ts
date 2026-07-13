// auth.ts — Auth.js v5 (next-auth@beta) config. Google provider, JWT sessions, no DB adapter.
// Reads AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET from env (Auth.js auto-detects these
// names). Construction is lazy — importing this file without those vars set does not throw;
// only an actual auth() / sign-in request errors. The app guards every call site on
// process.env.AUTH_SECRET so, until the vars exist, next-auth is never invoked and the
// anonymous flow is byte-identical to before.
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: 'jwt' },
  callbacks: {
    // Surface the Google account id (token.sub) on the session so the KV key can be u:{sub}.
    session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as typeof session.user & { id?: string }).id = token.sub;
      }
      return session;
    },
  },
});
