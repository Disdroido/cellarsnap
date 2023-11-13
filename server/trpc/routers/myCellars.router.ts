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
    .query(async ({ ctx, input }) => {
      const myCellarsService = new MyCellarsService();
      const mycellar = await myCellarsService.getMyCellarById(input.mycellar_id);
      return {
        mycellar
      };
    }),
  // createNote: readWriteProcedure
  //   .input(z.object({ note_text: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     const notesService = new NotesService();
  //     const note = ctx.activeAccountId
  //       ? await notesService.createNote(ctx.activeAccountId, input.note_text)
  //       : null;
  //     return {
  //       note
  //     };
  //   }),
  // deleteNote: adminProcedure
  //   .input(z.object({ note_id: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     const notesService = new NotesService();
  //     const note = ctx.activeAccountId
  //       ? await notesService.deleteNote(input.note_id)
  //       : null;
  //     return {
  //       note
  //     };
  //   }),
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
