import { RoleEntity } from "src/entities/role.entity";

export interface UserI {
    email: string;
    password: string;
    role: RoleEntity;
}
