
# Autenticación y Autorización con JWT en NestJS

## Descripción del Proyecto

Este proyecto implementa un sistema de autenticación y autorización en una API RESTful utilizando **NestJS** y **JSON Web Tokens (JWT)**. Está diseñado para manejar usuarios, roles y permisos, incorporando prácticas modernas de seguridad, como el uso de access tokens y refresh tokens, middleware y decoradores personalizados.

El objetivo es brindar una solución escalable y segura para proteger endpoints según el rol y permisos del usuario autenticado.

## Palabras Claves

* NestJS  
* JWT  
* Autenticación y Autorización  
* Roles y Permisos  
* Middleware  
* Decoradores  
* PostgreSQL / MySQL  

## Mantenido por

Costamagna Martín  
Giagnorio Gabriel  
Lynch Ramiro  
Mana Guido  
Pajon Valentino  
Rocha Gianella  
Testa Cecilia  
Villarreal Camila  

## Descarga del Proyecto

Puedes descargar el proyecto desde el siguiente enlace:

[Descargar JWT - NestJS](https://drive.google.com/file/d/1sYx3FAhufH5R1eo2GG1cILR76cf1xF3q/view?usp=sharing)

## Resumen del Proyecto

Este proyecto incluye:

1. Módulo de login para emisión de accessToken y refreshToken  
2. Middleware para validar JWT y autorizar solicitudes  
3. Decoradores para restringir acceso según permisos específicos  
4. Endpoints para gestión de usuarios, roles y permisos  
5. Almacenamiento seguro de contraseñas con `bcrypt`  
6. Uso de base de datos relacional (PostgreSQL o MySQL)

## Requisitos Previos

* Node.js y npm  
* NestJS CLI  
* PostgreSQL o MySQL  
* Postman (para pruebas de API)  

## Instrucciones de Configuración

1. **Clonar el repositorio**  
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd jwt-auth-nestjs
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**  
   ```imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'tp_jwt',
            username: 'postgres',
            password: 'mipassword',
            synchronize: true,
            entities
        })]
   ```

4. **Inicializar la base de datos**  
   Ejecutar migraciones o sincronizar entidades (según configuración).

5. **Levantar el servidor NestJS**  
   ```bash
   npm run start:dev
   ```

## Uso del Proyecto

### 1. **Autenticación**

- **POST `/login`**: Envía credenciales y recibe `accessToken` y `refreshToken`
- **POST `/refresh-token`**: Envía `refreshToken` y recibe nuevo `accessToken`

### 2. **Gestión de Recursos Protegidos**

- **GET `/me`**: Protegido con `@Permissions(['user_get_me'])`
- **GET `/can-do/:permission`**: Protegido con `@Permissions(['user_get_permissions'])`
- **POST `/permissions`**: Protegido con `@Permissions(['permission_create'])`
- etc.

### 3. **Decorador de Permisos**

```ts
export const Permissions = Reflector.createDecorator<string[]>();
-- utilizado en los AuthGuard.
```

### 4. **Middleware**

Intercepta solicitudes para validar el JWT, registrar logs, controlar errores, etc.

## ¿Dónde se almacenan los Tokens?

* `LocalStorage / SessionStorage`: Riesgo de XSS  
* `Cookies`: Riesgo de CSRF  
* Se recomienda asegurar `HttpOnly`, `SameSite` y `Secure` según el caso

## Seguridad de Contraseñas

* Las contraseñas se almacenan usando hashing seguro con `bcrypt`  
  ```ts
  hashSync(password, salt)
  compareSync(password, hash)
  ```

## Estructura del Proyecto

jwt-auth-nestjs/  
├── src/  
│   ├── auth/               # Login, JWT, tokens  
│   ├── users/              # Gestión de usuarios  
│   ├── roles/              # Gestión de roles  
│   ├── permissions/        # Gestión de permisos  
│   └── common/             # Decoradores y middlewares  
├── .env                    # Configuración del entorno  
├── package.json            # Dependencias y scripts  
└── README.md               # Documentación del proyecto

## Descargo de Responsabilidad

El código proporcionado se ofrece "tal cual", sin garantía de ningún tipo, expresa o implícita. En ningún caso los autores o titulares de derechos de autor serán responsables de cualquier reclamo, daño u otra responsabilidad derivada del uso del software.
