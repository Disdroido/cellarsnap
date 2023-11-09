import { Prisma } from '@prisma/client';

export const membershipWithAccount = Prisma.validator<Prisma.MembershipInclude>()({});
export type MembershipWithAccount = Prisma.MembershipGetPayload<
  typeof membershipWithAccount
>;

export const membershipWithUser = Prisma.validator<Prisma.MembershipInclude>()({});
export type MembershipWithUser = Prisma.MembershipGetPayload<
  typeof membershipWithUser
>;


type UserInclude = Prisma.UserInclude & {
  include?: {
    memberships?: {
      include?: {
        account?: boolean
      }
    }
  };
};
export const fullDBUser = Prisma.validator<UserInclude>()({
  include: {
    memberships: {
      include: {
        account: true
      }
    }
  }
});
export type FullDBUser = Prisma.UserGetPayload<typeof fullDBUser>; //TODO - I wonder if this could be replaced by just user level info

type AccountInclude = Prisma.AccountInclude & {
  include?: {
    members?: {
      include?: {
        user?: boolean;
      };
    };
  };
};
export const accountWithMembers = Prisma.validator<AccountInclude>()({
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