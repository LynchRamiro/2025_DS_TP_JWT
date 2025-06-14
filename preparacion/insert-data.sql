\c tp_jwt;

insert into roles (id, name) values
(1, 'rol1'),
(2, 'rolrol'),
(3, 'roluser'),
(4, 'rolperm');
insert into permissions (id, code) values
(1, 'role_create'),
(2, 'role_get_all'),
(3, 'user_get_me'),
(4, 'user_get_permissions'),
(5, 'permission_create'),
(6, 'permission_get_all'),
(7, 'restaurant_edit');
insert into users (id, email, password, "roleId") values
(1, 'email1@jotmail.com', '$2b$10$KDQxgwkdaKTWJD8y5GSyAeDfu6DaNIypIo5qG7/x7e1qN.WjnhuWq', 1),
(2, 'email2@jotmail.com', '$2b$10$59tcm4WzdfvHUYTEMyjqeeUpg7cRPuQKoqe7PMOtEI4I7.o1gg1HG', 2),
(3, 'email3@jotmail.com', '$2b$10$Lw17SNre/cfCTkA33/o4Z.1u5tpjWAi8AMVLVYNRaVxxIrf1TXO6u', 3),
(4, 'email4@jotmail.com', '$2b$10$.UIsZbO6NBaGq1XQLiYAr.xWaKBOVgEsvsJyWmyc.KLDIzDvc3E/O', 4);
insert into roles_permissions_permissions ("rolesId", "permissionsId") values
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 1),
(2, 2),
(3, 3),
(3, 4),
(4, 5),
(4, 6);