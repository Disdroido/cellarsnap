import { H3Event, getQuery } from 'h3';
import { defineProtectedEventHandler } from '../defineProtectedEventHandler';
import NotesService from '~/lib/services/notes.service';

// Example API Route with query params ... /api/note?note_id=41
export default defineProtectedEventHandler(async (event: H3Event) => {
  const queryParams = getQuery(event);
  let mycellar: string = '';
  if (queryParams.mycellar) {
    if (Array.isArray(queryParams.mycellar)) {
      mycellar = queryParams.mycellar[0];
    } else {
      mycellar = queryParams.mycellar.toString();
    }
  }

  const notesService = new NotesService();
  const myCellar = await notesService.getNoteById(mycellar);

  return {
    myCellar
  };
});
