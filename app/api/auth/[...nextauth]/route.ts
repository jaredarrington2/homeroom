// app/api/auth/[...nextauth]/route.ts — Auth.js request handlers (sign-in, callback, sign-out).
// Inert until AUTH_SECRET + the Google client vars are set; nothing in the UI links here until
// /api/me reports authEnabled, so it's never hit in the unconfigured state.
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
