# 🦆 Guía de Roles - Biblioteca Universidad Ducky

## 📋 Sistema de Autenticación y Roles

### ¿Cómo determina el sistema qué pantalla mostrar?

El sistema identifica el **rol del usuario** basándose en el **email** que ingresa al hacer login.

---

## 🔐 Roles Disponibles

### 👨‍💼 **ADMINISTRADOR / BIBLIOTECARIO**
**Acceso:** Dashboard de administrador (`/admin`)

#### Emails que activan este rol:
- ✅ `admin@ducky.edu`
- ✅ `bibliotecario@ducky.edu`
- ✅ Cualquier email que contenga la palabra **"admin"**
  - Ejemplo: `admin.juan@universidad.com`
  - Ejemplo: `maria.admin@ducky.edu`

#### Funcionalidades disponibles:
- ✨ Gestión completa de usuarios (alta, baja, cambio)
- 📚 Gestión completa de libros (fichas bibliográficas)
- 📊 Sistema de préstamos y devoluciones
- 💰 Gestión de multas
- 👥 Configuración de roles y permisos
- 📈 Historial del sistema

---

### 👨‍🎓 **USUARIO (Alumno/Profesor)**
**Acceso:** Homepage de usuario (`/user/home`)

#### Emails que activan este rol:
- ✅ Cualquier email que **NO** contenga "admin" o "bibliotecario"
  - Ejemplo: `juan.perez@ducky.edu`
  - Ejemplo: `maria.garcia@estudiante.com`
  - Ejemplo: `profesor.lopez@ducky.edu`

#### Funcionalidades disponibles:
- 🔍 Búsqueda de libros en el catálogo
- 📖 Consulta de disponibilidad y ubicación
- 📚 Acceso a libros populares y recomendados
- 💳 Consulta de multas personales
- 👤 Gestión de cuenta personal

---

## 🔄 Flujo de Autenticación

```
┌─────────────────────┐
│   Login Page (/)    │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Ingresa Email│
    │  + Password  │
    └──────┬───────┘
           │
           ▼
  ┌────────────────────┐
  │ ¿Email contiene    │
  │ "admin" o es       │◄──── Sistema de detección
  │ "bibliotecario"?   │
  └────┬──────────┬────┘
       │          │
    SÍ │          │ NO
       │          │
       ▼          ▼
  ┌─────────┐  ┌──────────┐
  │ /admin  │  │/user/home│
  └─────────┘  └──────────┘
  Dashboard    Homepage
   Admin        Usuario
```

---

## 💾 Almacenamiento Local

El sistema guarda la información del usuario en **localStorage**:

```javascript
localStorage.setItem('userRole', 'admin'); // o 'user'
localStorage.setItem('userEmail', 'usuario@ducky.edu');
```

Al cerrar sesión, esta información se **limpia automáticamente**.

---

## 🧪 Pruebas de Acceso

### Para probar como ADMINISTRADOR:
1. Ve a la página de login: `http://localhost:5173/`
2. Ingresa cualquiera de estos emails:
   - `admin@ducky.edu`
   - `bibliotecario@ducky.edu`
   - `juan.admin@test.com`
3. Ingresa cualquier contraseña
4. Click en "Iniciar sesión"
5. ✅ **Resultado:** Redirige a `/admin` (Dashboard de administrador)

### Para probar como USUARIO:
1. Ve a la página de login: `http://localhost:5173/`
2. Ingresa cualquier email SIN "admin":
   - `alumno@ducky.edu`
   - `profesor.lopez@ducky.edu`
   - `maria@estudiante.com`
3. Ingresa cualquier contraseña
4. Click en "Iniciar sesión"
5. ✅ **Resultado:** Redirige a `/user/home` (Homepage de usuario)

---

## 🚪 Cerrar Sesión

Al hacer click en "Cerrar sesión" desde cualquier layout:
1. Aparece un diálogo de confirmación
2. Si confirma: limpia localStorage y redirige a `/` (Login)
3. Si cancela: permanece en la página actual

---

## 🛡️ Seguridad

**IMPORTANTE:** Este es un sistema de autenticación **FRONTEND SIMULADO**.

Para producción real, necesitarías:
- ✅ Backend con base de datos
- ✅ JWT o tokens de sesión
- ✅ Validación real de contraseñas (hash + salt)
- ✅ Protección de rutas con middleware
- ✅ HTTPS obligatorio

**Este sistema es perfecto para:**
- 🎓 Prototipos y demostraciones
- 🧪 Desarrollo frontend
- 📊 Presentaciones de proyectos universitarios

---

## 📞 Soporte

¿Tienes dudas? Revisa el código en:
- 📄 `/src/app/pages/Login.tsx` - Lógica de roles
- 📄 `/src/app/components/AdminLayout.tsx` - Layout de admin
- 📄 `/src/app/components/UserLayout.tsx` - Layout de usuario

---

**¡Listo para usar! 🦆✨**
