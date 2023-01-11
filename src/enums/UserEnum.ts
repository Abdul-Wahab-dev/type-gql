import { registerEnumType } from "type-graphql";

export enum ROLE {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  USER = "USER",
  ACCOUNT = "ACCOUNT",
}

registerEnumType(ROLE, {
  name: "ROLE",
});
