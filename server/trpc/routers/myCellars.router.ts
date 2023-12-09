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
    .query(async ({ input }) => {
      const myCellarsService = new MyCellarsService();
      const mycellar = await myCellarsService.getMyCellarById(input.mycellar_id);
      return {
        mycellar
      };
    }),
  createMyCellar: readWriteProcedure
    .input(z.object({ 
      cellar_name: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const myCellarsService = new MyCellarsService();
      const myCellar = ctx.activeAccountId && ctx.user
        ? await myCellarsService.createMyCellar(ctx.activeAccountId, input.cellar_name)
        : null;
      return {
        myCellar
      };
    }),
  manageRacks: readWriteProcedure
    .input(z.object({
      mycellar_id: z.string(),
      racks: z.array(z.object({
        rackId: z.string(),
        rackName: z.string(),
        rackRows: z.number(),
        rackColumns: z.number(),
        rackLocation: z.string(),
        rackBottles: z.array(z.object({
          bottleId: z.string().nullable(),
          bottleName: z.string().nullable(),
          bottleYear: z.number().nullable(),
          bottleType: z.string().nullable(),
          bottleAmount: z.number().nullish(),
        }))
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      const myCellarsService = new MyCellarsService();
      const myCellar = ctx.activeAccountId
        ? await myCellarsService.manageRacks(input.mycellar_id, input.racks)
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
