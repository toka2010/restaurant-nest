import { SetMetadata } from "@nestjs/common";

export const hasRoles =(...hasroles :string[])=> SetMetadata('roles' ,hasroles);


