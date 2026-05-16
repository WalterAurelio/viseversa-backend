# ViseVersa Backend

Backend CRUD completo para ViseVersa con arquitectura MVC, construido con Express, TypeScript, Mongoose y MongoDB.

## 📋 Características

- ✅ Arquitectura MVC con estructura por capas
- ✅ CRUD completo para 3 entidades: Usuario, Producto, Comentario
- ✅ Validación de datos con Zod
- ✅ Manejo de errores global personalizado
- ✅ Middleware de validación centralizado
- ✅ CORS configurado
- ✅ Variables de entorno con dotenv
- ✅ TypeScript con configuración estricta
- ✅ Tipado fuerte con Mongoose e interfaces TypeScript

## 🚀 Inicio Rápido

### Requisitos
- Node.js >= 18.0.0
- npm o yarn
- MongoDB (local o remoto, ej: MongoDB Atlas)

### Instalación

1. **Clonar o descargar el proyecto**
```bash
cd viseversa-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Copia el archivo `.env.example` a `.env` y actualiza los valores:
```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/viseversa?retryWrites=true&w=majority
```

4. **Compilar TypeScript**
```bash
npm run build
```

5. **Iniciar en desarrollo**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── config/              # Configuración (conexión a MongoDB)
│   └── database.ts
├── models/              # Esquemas Mongoose
│   ├── User.ts
│   ├── Product.ts
│   └── Comment.ts
├── controllers/         # Lógica CRUD
│   ├── user.controller.ts
│   ├── product.controller.ts
│   └── comment.controller.ts
├── routes/              # Definición de rutas
│   ├── user.routes.ts
│   ├── product.routes.ts
│   └── comment.routes.ts
├── schemas/             # Esquemas Zod para validación
│   ├── user.schema.ts
│   ├── product.schema.ts
│   └── comment.schema.ts
├── middleware/          # Middleware personalizado
│   ├── validate.ts      # Middleware de validación Zod
│   └── errorHandler.ts  # Manejador de errores global
├── errors/              # Clases de error personalizadas
│   └── AppError.ts
├── types/               # Tipos TypeScript globales
├── app.ts               # Configuración de Express
└── index.ts             # Punto de entrada
```

## 🔌 Endpoints API

### Usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Productos
- `POST /api/products` - Crear producto
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Comentarios
- `POST /api/comments` - Crear comentario
- `GET /api/comments` - Obtener todos los comentarios
- `GET /api/comments/:id` - Obtener comentario por ID
- `PUT /api/comments/:id` - Actualizar comentario
- `DELETE /api/comments/:id` - Eliminar comentario

### Health Check
- `GET /api/health` - Verificar estado del servidor

## 📝 Ejemplo de Uso

### Crear Usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombreUsuario": "juan_perez",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "email": "juan@example.com",
    "contraseña": "password123",
    "ubicacion": "Madrid, España"
  }'
```

### Crear Producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": "ID_DEL_USUARIO",
    "titulo": "Laptop Dell",
    "descripcion": "Laptop de excelente condición, poco uso",
    "imagenes": ["url_imagen1", "url_imagen2"],
    "estaActivo": true
  }'
```

### Crear Comentario
```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": "ID_DEL_USUARIO",
    "descripcion": "Excelente producto, muy recomendado",
    "imagenes": []
  }'
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Iniciar servidor en modo desarrollo con auto-reload (nodemon)
- `npm run build` - Compilar TypeScript a JavaScript en carpeta `dist/`
- `npm start` - Iniciar servidor desde código compilado

## 🔐 Validación de Datos

Todos los endpoints validan los datos de entrada usando Zod. Los errores de validación se retornan con estado 422 y detalles claros del campo afectado.

Ejemplo de error de validación:
```json
{
  "status": "error",
  "statusCode": 422,
  "message": "Errores de validación: email: Invalid email, ...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users"
}
```

## ⚠️ Manejo de Errores

La aplicación maneja errores de forma centralizada con respuestas estructuradas:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Usuario no encontrado",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/users/123"
}
```

## 🗄️ Modelos de Datos

### Usuario
- `_id`: ObjectId (automático)
- `nombreUsuario`: string (único)
- `fotoPerfil`: string (opcional)
- `nombres`: string
- `apellidos`: string
- `email`: string (único)
- `contraseña`: string
- `puntacion`: number (default: 0)
- `ubicacion`: string (opcional)
- `createdAt`: Date (automático)
- `updatedAt`: Date (automático)

### Producto
- `_id`: ObjectId (automático)
- `usuarioId`: ObjectId (referencia a Usuario)
- `titulo`: string
- `descripcion`: string
- `imagenes`: string[] (array)
- `estaActivo`: boolean (default: true)
- `createdAt`: Date (automático)
- `updatedAt`: Date (automático)

### Comentario
- `_id`: ObjectId (automático)
- `usuarioId`: ObjectId (referencia a Usuario)
- `descripcion`: string
- `imagenes`: string[] (array)
- `createdAt`: Date (automático)
- `updatedAt`: Date (automático)

## 🔮 Próximos Pasos

- [ ] Agregar autenticación y autorización (JWT)
- [ ] Implementar paginación en endpoints GET
- [ ] Agregar búsqueda y filtrado de datos
- [ ] Implementar soft delete
- [ ] Agregar logging con Winston o Pino
- [ ] Crear tests unitarios y de integración
- [ ] Configurar CI/CD
- [ ] Documentación de API con Swagger/OpenAPI

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

## 📄 Licencia

ISC
