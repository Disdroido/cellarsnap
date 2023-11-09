import prisma_client from '~~/prisma/prisma.client';
import { openai } from './openai.client';
import { AccountLimitError } from './errors';
import AccountService from './account.service';
import { JSONArray } from 'superjson/dist/types';

export default class NotesService {
  async getAllNotes() {
    return prisma_client.myCellars.findMany();
  }

  async getNoteById(id: string) {
    return prisma_client.myCellars.findUniqueOrThrow({ where: { id } });
  }

  async getNotesForAccountId(account_id: string) {
    return prisma_client.myCellars.findMany({ where: { account_id } });
  }

  async createNote(account_id: string, name: string) {
    const account = await prisma_client.account.findFirstOrThrow({
      where: { id: account_id },
      include: { mycellars: true }
    });

    if (account.mycellars.length >= account.max_cellars) {
      throw new AccountLimitError(
        'Note Limit reached, no new notes can be added'
      );
    }

    return prisma_client.myCellars.create({ data: { account_id, name } });
  }

  async updateNote(id: string, name: string) {
    return prisma_client.myCellars.update({ where: { id }, data: { name } });
  }

  async deleteNote(id: string) {
    return prisma_client.myCellars.delete({ where: { id } });
  }

  async addBottles(account_id: string, bottles: JSONArray) {
    const account = await prisma_client.account.findFirstOrThrow({
      where: { id: account_id },
      include: { mycellars: true }
    });

    // if (account.mycellars.bottles.length >= account.max_bottles) {
    //   throw new AccountLimitError(
    //     'Note Limit reached, no new notes can be added'
    //   );
    // }

    return prisma_client.myCellars.create({ data: { account_id, bottles } });
  }

  async generateAINoteFromPrompt(userPrompt: string, account_id: string) {
    const accountService = new AccountService();
    const account = await accountService.checkAIGenCount(account_id);

    const prompt = `
    Write an interesting short note about ${userPrompt}.  
    Restrict the note to a single paragraph.
    `;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.6,
      stop: '\n\n',
      max_tokens: 1000,
      n: 1
    });

    await accountService.incrementAIGenCount(account);

    return completion.data.choices[0].text;
  }
}
