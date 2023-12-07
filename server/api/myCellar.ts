import { H3Event, getQuery } from 'h3';
import { defineProtectedEventHandler } from '../defineProtectedEventHandler';
import MyCellarsService from '~/lib/services/mycellars.service';

// Example API Route with query params ... /api/note?note_id=41
export default defineProtectedEventHandler(async (event: H3Event) => {
  const queryParams = getQuery(event);
  let mycellar_id: string = '';
  if (queryParams.mycellar_id) {
    if (Array.isArray(queryParams.mycellar_id)) {
      mycellar_id = queryParams.mycellar_id[0].toString();
    } else {
      mycellar_id = queryParams.mycellar_id.toString();
    }
  }

  const myCellarsService = new MyCellarsService();
  const mycellar = await myCellarsService.getMyCellarById(mycellar_id);

  return {
    mycellar
  };
});
