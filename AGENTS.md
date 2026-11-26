
# ChileGol Store - Frontend EV3

## Contexto del proyecto

Proyecto académico de Desarrollo Fullstack II de Duoc UC.

ChileGol Store es una tienda virtual de camisetas
de clubes del fútbol chileno.

Responsabilidades:
- Vicente: frontend.
- Benjamín: backend.

El proyecto continúa el frontend React desarrollado
durante la Evaluación 2.

## Tecnologías

- React
- JavaScript
- Vite
- Bootstrap
- React Router
- React Hook Form
- Atomic Design
- Jasmine
- Karma
- Git y GitHub

## Repositorio autorizado

https://github.com/vsaezm/chilegol-store-frontend

Rama estable: main
Rama de desarrollo: ev3-frontend

Trabajar exclusivamente sobre ev3-frontend.

## Reglas de desarrollo

1. Conservar el diseño visual existente.
2. Mantener la arquitectura Atomic Design.
3. Reutilizar los componentes existentes.
4. No crear otro proyecto React desde cero.
5. No inventar endpoints del backend.
6. No inventar atributos de la base de datos.
7. No guardar credenciales en GitHub.
8. No modificar main sin autorización.
9. No modificar el repositorio upstream.
10. No ejecutar git push --force.
11. No ejecutar comandos destructivos.
12. No actualizar dependencias indiscriminadamente.
13. Mantener código simple, claro y entendible.
14. Ejecutar pruebas después de cada modificación.
15. Verificar la compilación antes de publicar.
16. Crear commits separados por funcionalidad.
17. Solicitar autorización antes de hacer push.
18. Actualizar docs/ESTADO_EV3.md.

## Arquitectura

Mantener los componentes organizados en:

- atoms
- molecules
- organisms
- templates
- pages

La comunicación HTTP se implementa mediante
src/services/api.js.

Utilizar VITE_API_URL para configurar el backend.

No incluir secretos en variables VITE_.

## Comandos de verificación

npm run build
npm run test:ci
git status

## Método de trabajo

Inspeccionar el código antes de modificarlo.

Implementar, probar, corregir y documentar cada
funcionalidad antes de crear su commit.

Avanzar autónomamente con las tareas disponibles.

Cuando falte información del backend, documentar
el bloqueo y continuar con tareas independientes.

## Protocolo de la verdad

No inventar funcionalidades, resultados ni pruebas.

Distinguir entre lo implementado, lo probado,
lo pendiente y las propuestas técnicas.

Si falta información, indicar:

"No tengo información segura sobre esto".
