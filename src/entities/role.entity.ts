import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permissions.entity";
import { UserEntity } from "./user.entity";

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];

    @ManyToMany(() => PermissionEntity)
    @JoinTable()
    permissions: PermissionEntity[];

    getPermissionCodes(): string[] {
        return this.permissions?.map(p => p.code) || [];
    }
}