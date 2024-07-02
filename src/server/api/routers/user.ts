import { type Prisma } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { db } from '~/server/db';

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        status: z.number().optional(),
        id: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { page = 1, limit = 10 } = input;

      const skip = (page - 1) * limit;

      const query: Prisma.UserFindManyArgs = {
        skip: skip,
        take: limit,
        where: {
          OR: [
            {
              id: {
                contains: input.id,
                mode: 'insensitive',
              },
            },
            {
              status: {
                equals: input.status,
              },
            },
          ],
        },
      };

      const [users, count] = await db.$transaction([
        db.user.findMany(query),
        db.user.count({ where: query.where }),
      ]);

      return {
        data: users,
        pagination: {
          total: count,
        },
      };
    }),
});
