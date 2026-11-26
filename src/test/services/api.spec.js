import { crearClienteApi, ErrorHttp, solicitarApi } from '../../services/api';

describe('Cliente HTTP', () => {
  // Origen reservado para pruebas. Cada caso intercepta fetch antes de usarlo.
  const origen = 'https://pruebas.invalid';
  const solicitar = crearClienteApi(`${origen}/prefijo/`);
  let peticion;

  beforeEach(() => {
    peticion = spyOn(window, 'fetch');
  });

  it('exige una base configurada antes de usar la red', async () => {
    await expectAsync(solicitarApi('')).toBeRejectedWithError(/VITE_API_URL/);
    await expectAsync(crearClienteApi('base-relativa')('')).toBeRejectedWithError(/VITE_API_URL/);
    expect(peticion).not.toHaveBeenCalled();
  });

  it('mantiene el prefijo y los parámetros de consulta y lee JSON', async () => {
    peticion.and.resolveTo(new Response('["prueba"]'));
    expect(await solicitar('/muestra?q=1')).toEqual(['prueba']);
    const [url, opciones] = peticion.calls.mostRecent().args;
    expect(url).toBe(`${origen}/prefijo/muestra?q=1`);
    expect(opciones.headers.get('Accept')).toBe('application/json');
    expect(opciones.headers.has('Content-Type')).toBeFalse();
    expect(opciones.body).toBeUndefined();
  });

  it('envía JSON y conserva el método, las cabeceras y la señal del llamador', async () => {
    peticion.and.resolveTo(new Response('false'));
    const { signal } = new AbortController();
    const resultado = await solicitar('muestra', {
      method: 'POST', json: ['prueba'], headers: { Accept: 'application/problem+json' }, signal,
    });
    expect(resultado).toBeFalse();
    const [, opciones] = peticion.calls.mostRecent().args;
    expect(opciones.method).toBe('POST');
    expect(opciones.body).toBe('["prueba"]');
    expect(opciones.headers.get('Content-Type')).toBe('application/json');
    expect(opciones.headers.get('Accept')).toBe('application/problem+json');
    expect(opciones.signal).toBe(signal);
  });

  it('admite una base del mismo sitio y cuerpos nativos de fetch', async () => {
    peticion.and.resolveTo(new Response(null, { status: 204 }));
    const body = new FormData();
    expect(await crearClienteApi('/prefijo')('muestra', { method: 'POST', body })).toBeNull();
    const [url, opciones] = peticion.calls.mostRecent().args;
    expect(url).toBe('/prefijo/muestra');
    expect(opciones.body).toBe(body);
    expect(opciones.headers.has('Content-Type')).toBeFalse();
  });

  it('devuelve null en respuestas exitosas sin contenido', async () => {
    for (const status of [200, 204, 205]) {
      peticion.and.resolveTo(new Response(null, { status }));
      expect(await solicitar('')).toBeNull();
    }
  });

  it('conserva el estado HTTP y el detalle JSON, de texto o vacío al fallar', async () => {
    for (const [status, texto, detalle] of [[422, '["prueba"]', ['prueba']], [503, 'Ocupado', 'Ocupado'], [404, null, null]]) {
      peticion.and.resolveTo(new Response(texto, { status }));
      await expectAsync(solicitar('')).toBeRejectedWith(jasmine.objectContaining({
        name: 'ErrorHttp', status, detalle,
      }));
    }
  });

  it('rechaza una respuesta exitosa con JSON inválido', async () => {
    peticion.and.resolveTo(new Response('<html></html>'));
    await expectAsync(solicitar('')).toBeRejectedWithError(/JSON inválido/);
  });

  it('propaga el fallo de red y la cancelación originales', async () => {
    for (const fallo of [new TypeError('Sin conexión'), new DOMException('Cancelada', 'AbortError')]) {
      peticion.and.rejectWith(fallo);
      await expectAsync(solicitar('')).toBeRejectedWith(fallo);
      expect(fallo instanceof ErrorHttp).toBeFalse();
    }
  });
});
