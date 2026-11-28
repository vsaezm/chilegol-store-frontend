
# Estado del proyecto ChileGol Store EV3

Actualizado el 28/11/2026 en la rama `ev3-frontend`.

## Información general

Asignatura: Desarrollo Fullstack II.
Institución: Duoc UC.
Evaluación: 3.

Frontend: Vicente.
Backend: Benjamín.

Repositorio:
https://github.com/vsaezm/chilegol-store-frontend

Rama de desarrollo: ev3-frontend.

## Tareas completadas

- [x] Crear repositorio frontend.
- [x] Recuperar código React de EP2.
- [x] Instalar dependencias.
- [x] Ejecutar aplicación localmente.
- [x] Verificar compilación de producción.
- [x] Crear rama ev3-frontend.
- [x] Adaptar configuración de Vite.
- [x] Recuperar imágenes en el navegador local.
- [x] Auditar código mediante Codex.
- [x] Corregir configuración de Karma.
- [x] Implementar cliente HTTP.
- [x] Crear archivo .env.example.
- [x] Actualizar .gitignore.
- [x] Implementar ocho pruebas HTTP nuevas.
- [x] Ejecutar 18 pruebas exitosamente.
- [x] Publicar los cuatro primeros commits de EV3 en GitHub. La referencia de partida confirmada fue `5c7a10e`.
- [x] Completar el paso 16 y verificar las imágenes en la compilación de producción local.
- [x] Recuperar el carrito ante datos inválidos y actualizar la guía de ejecución.

## Commits de EV3

83d1a93
fix(frontend): adaptar configuracion de Vite para EV3

5cbd3b8
fix(test): ejecutar Jasmine con la configuración real de Karma

ab16481
feat(frontend): implementar cliente HTTP y pruebas unitarias de API

5c7a10e
docs(ev3): documentar instrucciones y estado del frontend

`8e31ef6` — Normalizar las rutas de imágenes y agregar pruebas unitarias (paso 16).

`3de3a0d` — Recuperar los datos del carrito ante errores de almacenamiento.

## Paso 16 · Imágenes de la tienda

- En `src/data/products.js`, `resolverImagen` combina la base de Vite con el nombre de archivo. Acepta las rutas guardadas con `images/`, `public/images/` y `tienda_ropa/`, incluso con consulta, fragmento o la ñ ya codificada. Al crear o editar un producto se guarda el nombre codificado. Consultarlo conserva los datos existentes.
- El selector ofrece las ocho imágenes de las camisetas iniciales. Cuatro nombres antiguos que ofrecía EP2 carecían de archivo. Si aparecen en datos guardados, se muestra la camiseta actual de Colo-Colo, U. de Chile, U. Católica o Cobreloa, según el equipo. El bloque de las ocho camisetas coincide con el de `5c7a10e`, incluidos precios, stock y descripciones.
- `ProductCard.jsx`, `ProductForm.jsx`, `Home.jsx`, `Cart.jsx`, `ProductDetail.jsx` y `AdminProducts.jsx` usan el mismo resolvedor. El átomo `src/components/atoms/Image.jsx` muestra `sin-imagen.svg` si falla la carga y evita reintentar el propio respaldo.
- `karma.conf.cjs` sirve las imágenes bajo una subruta de prueba. `src/test/services/imagenes.spec.js`, `src/test/molecules/ProductCard.spec.js` y `src/test/pages/App.spec.js` cubren la normalización, el respaldo y la navegación entre detalle y carrito con datos antiguos.

## Verificación del paso 16

| Ejecución | Jasmine/Karma | Sentencias | Ramas | Funciones | Líneas |
| --- | --- | --- | --- | --- | --- |
| 26/11, cliente HTTP | 18/18 | 51.22% (209/408) | 46.10% (142/308) | 52.94% (63/119) | 57.01% (195/342) |
| 26/11, 18:33:46, correcciones manuales | 26/26 | 51.69% (213/412) | 47.48% (151/318) | 52.94% (63/119) | 57.34% (199/347) |
| 28/11, paso 16 completo | 30/30 | 44.44% (260/585) | 39.06% (168/430) | 41.14% (79/192) | 48.49% (241/497) |

La prueba que monta `App` incorpora al informe las páginas importadas por el enrutador. Esto amplía la cantidad de líneas medidas. Las 30 pruebas pasaron en Edge Headless y Karma terminó sin avisos 404 de imágenes.

La compilación del 26/11 registró 69 módulos y 323 ms. Para el paso 16, `npm run build` terminó correctamente con Vite 8.3.4, 59 módulos y 313 ms. Los 11 archivos de `dist/images` coinciden por nombre y SHA-256 con `public/images`.

En la vista previa local de producción bajo `/chilegol-store-frontend/`, se revisaron visualmente el inicio, el catálogo, el detalle, el carrito, la tabla administrativa y la vista previa del formulario. Edge cargó las ocho fotos del catálogo y mostró la camiseta de Unión Española a partir de una ruta antigua. También se comprobó el respaldo con el campo vacío y con un archivo inexistente.

## Recuperación del carrito local

Cuatro pruebas en `src/test/pages/App.spec.js` reprodujeron fallos al abrir la tienda con JSON incompleto, un objeto en lugar de una lista, una línea dañada o el almacenamiento bloqueado por el navegador.

`src/data/carrito.js` reutiliza las funciones de lectura y escritura de `src/data/storage.js`. Recupera las líneas válidas y admite cantidades y precios guardados como texto numérico. `src/App.jsx` guarda el carrito cuando el usuario lo modifica. Si el navegador bloquea el almacenamiento, las compras en curso se mantienen en memoria mientras la aplicación esté abierta.

Después de la corrección, pasaron las 34 pruebas en Edge Headless. La cobertura fue del 47.77% de sentencias (290/607), 42.69% de ramas (193/452), 44.84% de funciones (87/194) y 51.75% de líneas (266/514). La compilación de producción terminó en 595 ms con 60 módulos.

## Preparación de la integración

- El `README.md` recoge el entorno probado, la ruta del catálogo, la vista previa de producción y la configuración pública de `VITE_API_URL`. Entre los archivos de entorno, Git solo registra `.env.example` y excluye `.env.local`.
- La única llamada a `fetch` de la aplicación está en `src/services/api.js`. Sus pruebas cubren errores HTTP, errores de red, JSON inválido, respuestas vacías y cancelación. Las pantallas actuales leen los datos locales de forma síncrona. Sus estados de carga y sus mensajes de error de servidor se implementarán con cada integración real.
- `npm run lint` pasó tras retirar dos importaciones de React sin uso en `Home.jsx` y `AdminUser.jsx`. La verificación final del 28/11 dio 34/34 pruebas aprobadas, 60 módulos compilados en 658 ms y 11/11 imágenes servidas con HTTP 200 y el tipo de imagen correcto.

## Modelo conceptual de datos

Entidades identificadas en el diseño del equipo:

1. Rol.
2. Usuario.
3. Dirección.
4. Comuna.
5. Región.
6. Estado.
7. Venta.
8. Método de envío.
9. Método de pago.
10. Detalle de venta.
11. Producto.
12. Categoría.
13. Equipo.
14. Imagen.

Los atributos, tipos de datos y endpoints deberán
confirmarse mediante el backend real.

## Tareas pendientes

- [ ] Obtener repositorio backend.
- [ ] Analizar contrato real de la API.
- [ ] Configurar VITE_API_URL.
- [ ] Integrar productos.
- [ ] Integrar categorías.
- [ ] Integrar equipos.
- [ ] Integrar imágenes.
- [ ] Integrar usuarios y roles.
- [ ] Integrar login y registro.
- [ ] Integrar regiones y comunas.
- [ ] Integrar direcciones.
- [ ] Adaptar carrito.
- [ ] Integrar métodos de envío.
- [ ] Integrar métodos de pago.
- [ ] Integrar ventas.
- [ ] Integrar detalles de venta.
- [ ] Integrar panel administrativo.
- [ ] Ejecutar pruebas de integración.
- [ ] Preparar entrega final.

## Problemas conocidos

- Node.js 24.22.0 emite `DEP0060` durante las pruebas. Karma 6.4.4 utiliza `http-proxy` 1.18.1 para servir su proxy y esa dependencia llama a `util._extend`. Las versiones figuran en el árbol local de npm.
- La tienda, las cuentas, el carrito y el flujo de compra siguen usando los datos locales de EP2. Las ocho pruebas del cliente HTTP usan un doble de `fetch`. La comprobación contra un servidor real está pendiente del repositorio de Benjamín.

## Siguiente tarea

Solicitar el repositorio backend de Benjamín y revisar en él las rutas, los formatos de respuesta y los requisitos de autenticación. Sobre la URL real y el contrato del servidor, «No tengo información segura sobre esto».
La publicación de los nuevos commits en `origin/ev3-frontend` requiere autorización de Vicente.
