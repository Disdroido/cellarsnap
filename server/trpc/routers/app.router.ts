import { router } from '~/server/trpc/trpc';
import { authRouter } from './auth.router';
import { accountRouter } from './account.router';
import { myCellarsRouter } from './myCellars.router';

export const appRouter = router({
  auth: authRouter,
  account: accountRouter,
  myCellars: myCellarsRouter
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
