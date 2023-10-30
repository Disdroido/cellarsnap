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
    const notes = ctx.activeAccountId
      ? await notesService.getNotesForAccountId(ctx.activeAccountId)
      : [];
    return {
      notes
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
    .input(z.object({ mybottls: z.toJSON()() }))
    .mutation(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const note = ctx.activeAccountId
        ? await notesService.createNote(ctx.activeAccountId, input.mybottls)
        : null;
      return {
        note
      };
    }),
  deleteNote: adminProcedure
    .input(z.object({ mycellar_id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const note = ctx.activeAccountId
        ? await notesService.deleteNote(input.mycellar_id)
        : null;
      return {
        note
      };
    }),
  generateAINoteFromPrompt: readWriteProcedure
    .use(accountHasSpecialFeature)
    .input(z.object({ user_prompt: z.string() }))
    .query(async ({ ctx, input }) => {
      const notesService = new NotesService();
      const noteText = ctx.activeAccountId
        ? await notesService.generateAINoteFromPrompt(
            input.user_prompt,
            ctx.activeAccountId
          )
        : null;
      return {
        noteText
      };
    })
});
