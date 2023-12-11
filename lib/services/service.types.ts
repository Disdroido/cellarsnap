import { Prisma } from '@prisma/client';

export const membershipWithAccount = Prisma.validator<Prisma.MembershipDefaultArgs>()({
  include: { account: true }
});
export type MembershipWithAccount = Prisma.MembershipGetPayload<
  typeof membershipWithAccount
>;

export const membershipWithUser = Prisma.validator<Prisma.MembershipDefaultArgs>()({
  include: { user: true }
});
export type MembershipWithUser = Prisma.MembershipGetPayload<
  typeof membershipWithUser
>;

export const fullDBUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    memberships: {
      include: {
        account: true
      }
    }
  }
});
export type FullDBUser = Prisma.UserGetPayload<typeof fullDBUser>; //TODO - I wonder if this could be replaced by just user level info

export const accountWithMembers = Prisma.validator<Prisma.AccountDefaultArgs>()({
  include: {
    members: {
      include: {
        user: true
      }
    }
  }
});
export type AccountWithMembers = Prisma.AccountGetPayload<
  typeof accountWithMembers
>; //TODO - I wonder if this could just be a list of full memberships