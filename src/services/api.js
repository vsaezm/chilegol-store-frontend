export class ErrorHttp extends Error {
  constructor(status, detalle) {
    super(`La API respondió con HTTP ${status}.`);
    this.name = 'ErrorHttp';
    this.status = status;
    this.detalle = detalle;
  }
}

export function crearClienteApi(urlBase) {
  return async function solicitar(ruta, { json, headers, ...opciones } = {}) {
    const base = urlBase?.trim();
    if (!base) {
      throw new Error('Configura VITE_API_URL antes de consultar la API.');
    }
    if (!/^(https?:\/\/|\/(?!\/))/i.test(base)) {
      throw new Error('VITE_API_URL debe ser una URL HTTP(S) o una ruta desde la raíz del sitio.');
    }
    const destino = `${base.replace(/\/+$/, '')}/${ruta.replace(/^\/+/, '')}`;
    const cabeceras = new Headers(headers);
    if (!cabeceras.has('Accept')) cabeceras.set('Accept', 'application/json');
    if (json !== undefined) {
      if (!cabeceras.has('Content-Type')) cabeceras.set('Content-Type', 'application/json');
      opciones.body = JSON.stringify(json);
    }

    const respuesta = await fetch(destino, { ...opciones, headers: cabeceras });
    const texto = await respuesta.text();
    let datos = null;
    if (texto.trim()) {
      try {
        datos = JSON.parse(texto);
      } catch (cause) {
        if (respuesta.ok) throw new Error('La API devolvió una respuesta con JSON inválido.', { cause });
        datos = texto;
      }
    }
    if (!respuesta.ok) throw new ErrorHttp(respuesta.status, datos);
    return datos;
  };
}

export const solicitarApi = crearClienteApi(import.meta.env.VITE_API_URL);
