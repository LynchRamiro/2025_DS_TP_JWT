Autenticación y Autorización con JWT en NestJS🔑
Descripción del Proyecto
Este proyecto implementa un sistema de autenticación y autorización en una API REST utilizando NestJS y JSON Web Tokens (JWT). Está diseñado para manejar usuarios, roles y permisos, incorporando prácticas modernas de seguridad, como el uso de access tokens y refresh tokens, middleware y decoradores personalizados.

El objetivo es brindar una solución escalable y segura para proteger endpoints según el rol y permisos del usuario autenticado.
Palabras Claves
NestJS
JWT
Autenticación y Autorización
Roles y Permisos
Middleware
Decoradores
PostgreSQL 
Docker
Mantenido por:

Lynch Ramiro
Pajon Valentino
Rocha Gianella


Requisitos Previos
NestJS CLI
Postman o Thunder Client (para realizar las pruebas de autenticación)
Docker
 Node.js (v18+) 
PostgreSQL (usado vía Docker) 
VSCode (recomendado) 
Extensión de PostgreSQL para VSCode (opcional)
Servicios definidos
Base de datos PostgreSQL: La conexión con PostgreSQL se realiza a través de TypeORM en el archivo AppModule de NestJS.
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'tp_jwt',
            username: 'postgres',
            password: '211104',
            synchronize: true,
            entities
        }),
        TypeOrmModule.forFeature(entities),
        UsersModule,
        PermissionsModule,
        RolesModule,
        JwtModule
    ],
    controllers: [AppController, UsersController],
    providers: [AuthGuard, JwtService, UsersService],
})
Inicialización del contenedor de Docker:  como con anterioridad ya hemos creado el contenedor en el proyecto de Restaurant y Menú por lo tanto solo lo inicializamos de la siguiente manera:
Docker run postgres-tpi
Creación de base de datos:
docker exec -it postgres-tpi psql -U postgres  (para acceder al cliente interactivo psql dentro de un contenedor Docker que está ejecutando PostgreSQL.)
CREATE DATABASE mi_base_de_datos;

Instructivo del proyecto

Instalación de dependencias: npm install 
Creación del contenedor y dentro del mismo la creación de la base de datos
Inicialización del proyecto Nestjs: npm run start
Ejecutar el esquema.sql 
Probar y Consumir APIs mediante Postman o Thunder Client


Uso del Proyecto
Servicio y Controlador de Usuarios (UsersService & UsersController)
Este módulo gestiona toda la lógica de autenticación, registro, permisos y validación de usuarios en la API. Está compuesto por dos partes principales: el servicio de usuarios (UsersService) y su controlador (UsersController).
Funcionalidades principales:
Registro de usuarios: Permite crear nuevos usuarios con un email y contraseña, almacenando la contraseña de forma segura.


Inicio de sesión: Autentica usuarios y genera tokens JWT para controlar el acceso.


Refresco de tokens: Permite renovar el token de acceso usando un token de refresco válido.


Control de permisos: Verifica si un usuario tiene autorización para realizar ciertas acciones basadas en sus roles y permisos.


Obtención de datos del usuario: Devuelve información básica del usuario autenticado.
Endpoints principales expuestos:
POST /register — Registro de nuevos usuarios.


POST /login — Inicio de sesión y obtención de tokens.


GET /refresh-token — Renovación de token de acceso.


GET /me — Obtención de datos del usuario autenticado (requiere autenticación).


GET /can-do/:permission — Verificación de permisos específicos (requiere autenticación).


Seguridad:
Se utiliza autenticación basada en JWT y control de acceso mediante permisos asociados a roles, para proteger los recursos y operaciones sensibles.
Middleware
AuthGuard
El AuthGuard es una clase de protección personalizada que implementa la interfaz CanActivate de NestJS para controlar el acceso a rutas protegidas mediante autenticación JWT y validación de permisos. Primero, extrae y verifica el token JWT del encabezado Authorization de la solicitud, luego obtiene el usuario correspondiente a partir del payload (usualmente el email). Si el usuario es válido, se evalúan los permisos requeridos definidos por el decorador @Permissions() en el handler correspondiente, y se comparan con los permisos asignados al rol del usuario. Si el usuario no tiene todos los permisos necesarios o el token no es válido, se lanza una excepción Unauthorized. Este guardia asegura que solo usuarios autenticados y autorizados puedan acceder a rutas específicas dentro de la aplicación.
@Permissions()
El decorador @Permissions() permite definir de forma declarativa los permisos requeridos para acceder a un endpoint. Funciona junto al AuthGuard, que verifica si el usuario autenticado posee dichos permisos según su rol. Si no los tiene, se deniega el acceso.
Reflector 
El Reflector es una utilidad de NestJS que permite acceder a metadatos definidos mediante decoradores personalizados. En este proyecto, se utiliza para leer los permisos declarados con @Permissions() en los controladores o endpoints, permitiendo que el AuthGuard verifique si el usuario tiene los permisos necesarios. Esta herramienta facilita una arquitectura desacoplada y flexible para la autorización basada en metadatos.
JwtService
El JwtService es un servicio encargado de manejar la generación, verificación y renovación de tokens JWT. Utiliza dos tipos de tokens: access tokens (para autenticación) y refresh tokens (para renovar el token de acceso cuando expira). Las principales funciones son:
generateToken(): Genera un token JWT firmado, ya sea de acceso o de refresco, usando claves y tiempos de expiración distintos.


refreshToken(): Verifica un token de refresco válido, genera un nuevo token de acceso, y si el token de refresco está cerca de expirar, también lo renueva.


getPayload(): Verifica un token (access o refresh) y retorna su payload decodificado, lanzando una excepción si es inválido.


Este servicio centraliza la lógica de manejo de JWTs y es fundamental para implementar un sistema de autenticación seguro y eficiente.
Estructura del Proyecto
├── .vscode/                # Configuraciones del entorno de desarrollo (VSCode)
├── dist/                   # Código compilado (salida de TypeScript)
├── node_modules/           # Dependencias del proyecto
├── preparación/
│   └── esquema.sql         # Script SQL con la carga  de la base de datos
├── src/                    # Código fuente de la aplicación
│   ├── auth/               # Módulo de autenticación
│   ├── entities/           # Entidades o modelos de base de datos
│   ├── interfaces/         # Interfaces TypeScript compartidas
│   ├── jwt/                # Lógica para manejo de tokens JWT
│   ├── middlewares/        # Middlewares personalizados
│   ├── permissions/        # Decoradores y lógica de permisos
│   ├── roles/              # Lógica relacionada con los roles de usuario
│   ├── users/              # Módulo de gestión de usuarios
│   ├── app.controller.ts   # Controlador principal de la aplicación
│   ├── app.module.ts       # Módulo raíz de la aplicación
│   └── main.ts             # Punto de entrada de la aplicación
├── test/                   # Pruebas automatizadas
├── .env.db                 # Variables de entorno para configuración de la base de datos
├── docker-compose.yml      # Configuración de contenedores Docker
├── nest-cli.json           # Configuración del CLI de NestJS
├── package.json            # Dependencias y scripts del proyecto
├── package-lock.json       # Lockfile de dependencias
└── README_JWT.md           # Documentación del proyecto

Estructura de módulos
Cada módulo sigue la arquitectura de NestJS con sus respectivos:
controller.ts
service.ts
module.ts 