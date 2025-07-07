# Sistema de Autenticación con Firebase

Este proyecto incluye un sistema de autenticación completo con Firebase que permite:

- Login con email y contraseña
- Login con Google
- Registro de nuevos usuarios
- Dashboard protegido
- Manejo de sesiones automático

## Configuración de Firebase

Para que el sistema de autenticación funcione correctamente, necesitas configurar Firebase:

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la autenticación con Email/Password y Google en la consola

### 2. Configurar la aplicación

1. En la consola de Firebase, ve a "Project Settings" (Configuración del proyecto)
2. En la sección "Your apps", agrega una nueva aplicación web
3. Copia la configuración de Firebase
4. Reemplaza la configuración en `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

### 3. Habilitar métodos de autenticación

En la consola de Firebase:

1. Ve a "Authentication" → "Sign-in method"
2. Habilita "Email/Password"
3. Habilita "Google" y configura el proyecto
4. Para Google, necesitarás configurar el OAuth consent screen

### 4. Configurar dominio autorizado

En "Authentication" → "Settings" → "Authorized domains":
- Agrega `localhost` para desarrollo
- Agrega tu dominio de producción cuando despliegues

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Login.js          # Componente de login
│   ├── Login.css         # Estilos del login
│   ├── Register.js       # Componente de registro
│   ├── Register.css      # Estilos del registro
│   ├── Dashboard.js      # Dashboard después del login
│   └── Dashboard.css     # Estilos del dashboard
├── firebase/
│   └── config.js         # Configuración de Firebase
├── App.js               # Componente principal
└── App.css              # Estilos principales
```

## Características

### Login
- Autenticación con email y contraseña
- Autenticación con Google
- Validación de campos
- Manejo de errores en español
- Interfaz responsive

### Registro
- Crear cuenta con email y contraseña
- Registro con Google
- Validación de contraseñas
- Confirmación de contraseña
- Mensajes de error descriptivos

### Dashboard
- Información del usuario
- Cerrar sesión
- Diseño moderno y responsive
- Estadísticas básicas del usuario

### Características técnicas
- Manejo automático de sesiones
- Persistencia de sesión
- Estados de carga
- Responsive design
- Manejo de errores

## Personalización

Puedes personalizar fácilmente:

1. **Colores**: Modifica las variables CSS en los archivos `.css`
2. **Textos**: Cambia los textos en los componentes
3. **Validaciones**: Agrega más validaciones en los formularios
4. **Campos**: Agrega campos adicionales al registro
5. **Estilos**: Personaliza completamente el diseño

## Comandos disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta los tests
- `npm run eject` - Expone la configuración de React

## Notas importantes

- Asegúrate de mantener seguras las credenciales de Firebase
- No subas el archivo de configuración con credenciales reales a repositorios públicos
- Configura las reglas de seguridad en Firebase según tus necesidades
- Para producción, habilita los dominios autorizados correspondientes
