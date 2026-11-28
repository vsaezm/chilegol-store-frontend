# ChileGol Store · Frontend EV3

Tienda de camisetas del fútbol chileno desarrollada con React, Vite, Atomic Design y React Hook Form. EV3 continúa el frontend de EP2. El catálogo, las cuentas y el carrito funcionan con datos locales mientras el equipo prepara la integración con el backend.

Proyecto de la asignatura Desarrollo Fullstack II, Duoc UC.

## Integrantes

1. Vicente Saez
2. Benjamín Pizarro

## Cómo ejecutarlo

Entorno comprobado con Node.js 24.22.0. Las pruebas necesitan Chrome o, en Windows, Microsoft Edge. Para instalar las versiones de `package-lock.json` en una copia nueva del repositorio, ejecuta lo siguiente en la rama `ev3-frontend`.

```bash
npm ci
npm run dev
```

Abre la dirección que imprime Vite. La aplicación se sirve bajo `/chilegol-store-frontend/` y usa `HashRouter`. El catálogo se abre en `/chilegol-store-frontend/#/productos`.

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Genera la versión final en `dist/` |
| `npm run preview` | Sirve localmente la última compilación de `dist/` |
| `npm run lint` | Revisa el código con ESLint |
| `npm test` | Abre el navegador de pruebas y vuelve a ejecutar Jasmine al cambiar un archivo |
| `npm run test:ci` | Ejecuta las pruebas una vez, sin ventana, y deja la cobertura en `coverage/index.html` |

## Cuentas de demostración local

| Correo | Contraseña | Rol | Puede |
| --- | --- | --- | --- |
| admin@duoc.cl | 1234 | Administrador | Todo el panel: productos y usuarios |
| vendedor@duoc.cl | 1234 | Vendedor | Ver el panel y el listado de productos, sin modificar |
| cliente@gmail.com | 1234 | Cliente | Comprar en la tienda (no entra al panel) |

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/productos`, `/products/:id` | Catálogo y detalle |
| `/categorias` | Productos por categoría |
| `/carrito`, `/checkout`, `/pago-exitoso` | Compra |
| `/nosotros`, `/contacto` | Información y formulario de contacto |
| `/login`, `/registro` | Cuenta de usuario |
| `/admin` | Panel: resumen y stock crítico |
| `/admin/productos` | CRUD de productos (`?nuevo` o `?editar=ID` abre el formulario) |
| `/admin/usuarios` | CRUD de usuarios (solo Administrador) |

## Estructura

```
src/
├── assets/            Logo y estilos del panel (admin.css). Los estilos generales están en index.css
├── components/
│   ├── atoms/         Button, Input, Text, Image
│   ├── molecules/     ProductCard, FormGroup (etiqueta + campo + ayuda + error)
│   ├── organisms/     NavbarHeader, AdminSidebar, ProductForm, UserForm
│   └── templates/     MainLayout (tienda) y AdminLayout (panel protegido por rol)
├── data/              Catálogos, usuarios, regiones y persistencia local del carrito
├── pages/             Una página por ruta
├── services/          api.js contiene el cliente HTTP compartido
├── test/              Configuración, datos de prueba y casos de componentes, páginas y servicios
└── utils/             validaciones.js (reglas de la v1 para react-hook-form) y formato.js
```

## Datos y persistencia

Los productos y usuarios parten de `src/data/products.js` y `src/data/users.js`. La tienda utiliza `cgs_productos`, `cgs_usuarios`, `cgs_sesion` y `cgs_carrito` en `localStorage`. Las imágenes guardadas con rutas de EP2 se resuelven al mostrarlas. El carrito recupera las líneas válidas y, cuando el almacenamiento está bloqueado, permite seguir agregando artículos durante la sesión.

## Conexión con el backend

`src/services/api.js` exporta `solicitarApi`, `crearClienteApi` y `ErrorHttp`. Las ocho pruebas HTTP interceptan `fetch` y se pueden ejecutar sin servidor.

Cuando Benjamín confirme la URL base y el contrato de la API, copia `.env.example` a `.env.local`, asigna esa URL a `VITE_API_URL` y reinicia Vite. Las variables `VITE_` son públicas y se incorporan a la compilación. La aplicación actual se puede ejecutar con `VITE_API_URL` vacía.

## Validaciones de los formularios

Son las mismas de la versión 1 (`src/utils/validaciones.js`), aplicadas con react-hook-form:

- Correo: obligatorio, máximo 100 caracteres, solo `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- Contraseña: entre 4 y 10 caracteres.
- RUN: sin puntos ni guion, 7 a 9 caracteres, con dígito verificador (módulo 11).
- Nombre 50, apellidos 100, dirección 300 y mensaje de contacto 500 caracteres como máximo.
- Producto: código de 3 o más caracteres sin repetir, precio y stock mayores o iguales a 0, stock entero, categoría obligatoria.

## Documentos

- [Estado de EV3, verificaciones y tareas pendientes](docs/ESTADO_EV3.md)
- [Informe histórico de las 10 pruebas de EP2](docs/Cobertura_Testing.md)
