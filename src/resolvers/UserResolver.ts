import { Resolver, Query, Mutation } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { User } from "../schema/User";
import { UserResponse } from "../responses/UserResponse";

const prisma = new PrismaClient();
@Resolver(() => User)
export class UserResolver {
  @Query((returns) => UserResponse)
  async getUsers(): Promise<UserResponse> {
    try {
      const [userList, totalUsers] = await prisma.$transaction([
        prisma.user.findMany(),
        prisma.user.count(),
      ]);

      console.log(userList, totalUsers);
      return {
        users: userList[0],
        total: totalUsers,
      };
    } catch (err) {}

    // return {

    // }
  }
}
