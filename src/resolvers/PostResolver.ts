import { PrismaClient } from "@prisma/client";
import { Resolver, Query, Mutation } from "type-graphql";
const prisma = new PrismaClient();

@Resolver()
export class PostResolver {}
