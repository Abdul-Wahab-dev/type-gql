import { registerEnumType } from "type-graphql";

export enum ROLE {
  ADMIN,
  SUPER_ADMIN,
  USER,
  ACCOUNT,
}

registerEnumType(ROLE, {
  name: "ROLE",
});
