import NotesService from '~~/lib/services/notes.service';
import {
  accountHasSpecialFeature,
  adminProcedure,
  memberProcedure,
  publicProcedure,
  readWriteProcedure,
  router
} from '../trpc';
import { z } from 'zod';

export const notesRouter = router({
  getForActiveAccount: memberProcedure.query(async ({ ctx, input }) => {
    const notesService = new NotesService();
    const mycellars = ctx.activeAccountId
      ? await notesService.getNotesForAccountId(ctx.activeAccountId)
      : [];
    return {
      mycellars
    };
  }),
  getById: publicProcedure
    .input(z.object({ mycellar_id: z.string() }))
    .query(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const mycellar = await notesService.getNoteById(input.mycellar_id);
      return {
        mycellar
      };
    }),
  createNote: readWriteProcedure
    .input(z.object({ mybottles: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const mycellar = ctx.activeAccountId
        ? await notesService.createNote(ctx.activeAccountId, JSON.parse(input.mybottles))
        : null;
      return {
        mycellar
      };
    }),
  deleteNote: adminProcedure
    .input(z.object({ mycellar_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const mycellar = ctx.activeAccountId
        ? await notesService.deleteNote(input.mycellar_id)
        : null;
      return {
        mycellar
      };
    }),
  generateAINoteFromPrompt: readWriteProcedure
    .use(accountHasSpecialFeature)
    .input(z.object({ user_prompt: z.string() }))
    .query(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const mybottles = ctx.activeAccountId
        ? await notesService.generateAINoteFromPrompt(
            input.user_prompt,
            ctx.activeAccountId
          )
        : null;
      return {
        mybottles
      };
    })
});
