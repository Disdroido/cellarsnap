import MyCellarsService from '~~/lib/services/mycellars.service';
import {
  accountHasSpecialFeature,
  adminProcedure,
  memberProcedure,
  publicProcedure,
  readWriteProcedure,
  router
} from '../trpc';
import { z } from 'zod';
import { JsonArray } from '@prisma/client/runtime/library';

export const myCellarsRouter = router({
  getForActiveAccount: memberProcedure.query(async ({ ctx, input }) => {
    const myCellarsService = new MyCellarsService();
    const myCellars = ctx.activeAccountId
      ? await myCellarsService.getMyCellarsForAccountId(ctx.activeAccountId)
      : [];
    return {
      myCellars
    };
  }),
  getById: publicProcedure
    .input(z.object({ mycellar_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const myCellarsService = new MyCellarsService();
      const mycellar = await myCellarsService.getMyCellarById(input.mycellar_id);
      return {
        mycellar
      };
    }),
  createMyCellar: readWriteProcedure
    .input(z.object({ cellar_name: z.string(), racks: z.array(z.unknown()), bottles: z.array(z.unknown()) }))
    .mutation(async ({ ctx, input }) => {
      const myCellarsService = new MyCellarsService();
      const myCellar = ctx.activeAccountId && ctx.user
        ? await myCellarsService.createMyCellar(ctx.activeAccountId, input.cellar_name, input.racks as JsonArray, input.bottles as JsonArray)
        : null;
      return {
        myCellar
      };
    }),
  deleteMyCellar: adminProcedure
    .input(z.object({ mycellar_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const myCellarsService = new MyCellarsService();
      const myCellar = ctx.activeAccountId
        ? await myCellarsService.deleteMyCellar(input.mycellar_id)
        : null;
      return {
        myCellar
      };
    }),
  // generateAINoteFromPrompt: readWriteProcedure
  //   .use(accountHasSpecialFeature)
  //   .input(z.object({ user_prompt: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const notesService = new NotesService();
  //     const noteText = ctx.activeAccountId
  //       ? await notesService.generateAINoteFromPrompt(
  //           input.user_prompt,
  //           ctx.activeAccountId
  //         )
  //       : null;
  //     return {
  //       noteText
  //     };
  //   })
});
