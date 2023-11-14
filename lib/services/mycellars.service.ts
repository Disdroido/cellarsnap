import prisma_client from '~~/prisma/prisma.client';
import { openai } from './openai.client';
import { AccountLimitError } from './errors';
import AccountService from './account.service';
import { JsonArray } from '@prisma/client/runtime/library';

export default class MyCellarsService {
  async getAllCellars() {
    return prisma_client.myCellars.findMany();
  }

  async getMyCellarById(id: string) {
    return prisma_client.myCellars.findUniqueOrThrow({ where: { id } });
  }

  async getMyCellarsForAccountId(account_id: string) {
    return prisma_client.myCellars.findMany({ where: { account_id } });
  }

  async createMyCellar(account_id: string, cellar_name: string, racks: JsonArray, bottles: JsonArray) {
    if (racks === null) {
      throw new Error('Invalid value for racks');
    }

    const account = await prisma_client.account.findFirstOrThrow({
      where: { id: account_id },
      include: { MyCellars: true }
    });

    if (account.MyCellars.length >= account.max_notes) {
      throw new AccountLimitError(
        'Note Limit reached, no new notes can be added'
      );
    }

    return prisma_client.myCellars.create({ data: { account_id, cellar_name, racks, bottles } });
  }

  // async updateNote(id: string, note_text: string) {
  //   return prisma_client.note.update({ where: { id }, data: { note_text } });
  // }

  async deleteMyCellar(id: string) {
    return prisma_client.myCellars.delete({ where: { id } });
  }

  // async generateAINoteFromPrompt(userPrompt: string, account_id: string) {
  //   const accountService = new AccountService();
  //   const account = await accountService.checkAIGenCount(account_id);

  //   const prompt = `
  //   Write an interesting short note about ${userPrompt}.  
  //   Restrict the note to a single paragraph.
  //   `;
  //   const completion = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt,
  //     temperature: 0.6,
  //     stop: '\n\n',
  //     max_tokens: 1000,
  //     n: 1
  //   });

  //   await accountService.incrementAIGenCount(account);

  //   return completion.data.choices[0].text;
  // }
}
