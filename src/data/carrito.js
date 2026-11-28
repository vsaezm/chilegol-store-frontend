import { leer, guardar } from './storage';

const CLAVE_CARRITO = 'cgs_carrito';

function numeroGuardado(valor) {
  return typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : valor;
}

export function leerCarrito() {
  const guardado = leer(CLAVE_CARRITO, []);
  if (!Array.isArray(guardado)) return [];

  const carrito = [];
  for (const linea of guardado) {
    if (typeof linea?.nombre !== 'string' || !linea.nombre.trim()) continue;
    const id = numeroGuardado(linea.id);
    const precio = numeroGuardado(linea.precio);
    const cantidad = numeroGuardado(linea.cantidad);
    if (!Number.isSafeInteger(id) || id <= 0) continue;
    if (!Number.isFinite(precio) || precio < 0) continue;
    if (!Number.isSafeInteger(cantidad) || cantidad <= 0) continue;
    carrito.push({ ...linea, id, precio, cantidad });
  }
  return carrito;
}

export function guardarCarrito(carrito) {
  guardar(CLAVE_CARRITO, carrito);
}
