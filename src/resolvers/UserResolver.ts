import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { User } from "../schema/User";
import { UserResponse } from "../responses/UserResponse";
import { userInput } from "../inputs/UserInput";
import { hash, compare } from "bcrypt";
import { LoginInput } from "../inputs/LoginInput";
import { sign } from "jsonwebtoken";
const prisma = new PrismaClient();

const user = [
  {
    id: 1,
    email: "abc@gmail.com",
    name: "ABC",
    posts: [],
    role: "ADMIN",
  },
];

@Resolver(User)
export class UserResolver {
  // @desc               get users
  // @access             Public
  @Query(() => UserResponse)
  @Authorized()
  async getUsers(): Promise<UserResponse> {
    try {
      const [userList, totalUsers] = await prisma.$transaction([
        prisma.user.findMany(),
        prisma.user.count(),
      ]);

      // console.log(userList, totalUsers);
      return {
        users: userList,
        total: totalUsers,
      };
    } catch (err) {}

    // return {

    // }
  }

  // @desc               Create new user
  // @access             Public
  @Mutation((returns) => User)
  async addUser(@Arg("input") input: userInput): Promise<User> {
    try {
      const newUser = {
        id: input.id,
        name: input.name,
        email: input.email,
        role: input.role,
      };
      return newUser;
    } catch (err) {}
  }

  // @desc                update user
  // @access              Private
  @Mutation((returns) => User)
  async registerUser(@Arg("input") input: userInput): Promise<User> {
    // 1) check  user exist or not
    const existedUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    // 2) throw error if user exist
    if (existedUser) {
      throw new Error("User ALread exist!");
    }

    // 3) Encrypt user password
    const encryptedPassword = await hash(input.password, 12);

    // 4) create new User
    const newUser = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        role: input.role,
        password: encryptedPassword,
      },
    });
    return newUser;
  }

  // @desc                  login user
  // @access                Public
  @Mutation(() => String)
  async login(@Arg("input") input: LoginInput): Promise<String> {
    // 1) check user exist
    const existedUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    // 2) throw error if user not exist
    if (
      !existedUser ||
      !(await compare(input.password, existedUser.password))
    ) {
      throw new Error("User or passowrd incorrect");
    }

    // 3) send token to user

    const token = await sign(
      {
        id: existedUser.id,
        email: existedUser.email,
        name: existedUser.name,
        role: existedUser.role,
      },
      "HELLO_WORLD",
      {
        expiresIn: 3600,
      }
    );
    return token;
  }
}
