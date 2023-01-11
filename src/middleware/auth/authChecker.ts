import { AuthChecker } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
const prisma = new PrismaClient();

interface Context {
  req: { headers: { authorization: String } };
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

type decodedType = {
  id: number;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};
export const authChecker: AuthChecker<Context> = async ({ context }) => {
  let token;

  // 1) getting token and check if token exist
  const { req } = context;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return false;
  }
  // 2) verify token
  const decode: decodedType = (await verify(
    token,
    "HELLO_WORLD"
  )) as decodedType;
  // 3) check user still exist in db
  const currentUser = await prisma.user.findUnique({
    where: {
      email: decode.email,
    },
  });

  if (!currentUser) {
    return false;
  }

  context.user = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  };
  return true;
};
