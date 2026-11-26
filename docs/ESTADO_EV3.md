
# Estado del proyecto ChileGol Store EV3

Fecha de actualización: 26/11/2026.

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
- [x] Publicar avances en GitHub.

## Commits de EV3

83d1a93
fix(frontend): adaptar configuracion de Vite para EV3

5cbd3b8
fix(test): ejecutar Jasmine con la configuración real de Karma

ab16481
feat(frontend): implementar cliente HTTP y pruebas unitarias de API

## Resultados de testing

Fecha: 26/11/2026.

Pruebas ejecutadas: 18.
Pruebas exitosas: 18.
Pruebas fallidas: 0.

Cobertura:

- Sentencias: 51.22% (209/408).
- Ramas: 46.10% (142/308).
- Funciones: 52.94% (63/119).
- Líneas: 57.01% (195/342).

Compilación de producción: exitosa.

Módulos transformados: 69.
Tiempo registrado: 323 ms.

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

- [ ] Prevenir rutas antiguas en LocalStorage.
- [ ] Unificar resolución de imágenes.
- [ ] Revisar advertencia de imagen en Karma.
- [ ] Revisar advertencias de dependencias.
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
- [ ] Actualizar README.
- [ ] Preparar entrega final.

## Problemas conocidos

1. LocalStorage conservaba referencias a las
   rutas anteriores de las imágenes.

   Solución temporal aplicada:
   eliminar únicamente la clave cgs_productos.

   Solución permanente: pendiente.

2. Karma mostró advertencias 404 relacionadas
   con /sin-imagen.svg.

3. Se registró una advertencia DEP0060 de Node.js.

4. El contrato del backend todavía no está
   disponible para el desarrollo frontend.

## Siguiente tarea

Revisar la resolución de imágenes en el catálogo,
el carrito y el panel administrativo.

Evitar que LocalStorage conserve rutas dependientes
del nombre anterior del repositorio.

Después, continuar con la integración de la API
cuando Benjamín entregue el código backend.

No inventar endpoints ni simular conexiones reales.
