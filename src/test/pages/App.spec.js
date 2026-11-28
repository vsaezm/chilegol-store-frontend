import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import { mockProductos } from '../mocks/datos';

describe('Tienda con datos guardados', () => {
  let urlInicial;
  let estadoInicial;

  beforeEach(() => {
    urlInicial = window.location.href;
    estadoInicial = window.history.state;
  });

  afterEach(() => {
    window.history.replaceState(estadoInicial, '', urlInicial);
  });

  function abrir(ruta) {
    window.history.replaceState(null, '', '#' + ruta);
    return render(<App />);
  }

  it('muestra la imagen del detalle y del carrito guardados bajo el nombre anterior del sitio', async () => {
    const producto = { ...mockProductos[1], imagen: '/tienda_ropa/images/krilin-wanderers.webp' };
    const carrito = [{ ...producto, cantidad: 2 }];
    localStorage.setItem('cgs_productos', JSON.stringify([producto]));
    localStorage.setItem('cgs_carrito', JSON.stringify(carrito));

    abrir('/products/' + producto.id);
    const esperada = import.meta.env.BASE_URL + 'images/krilin-wanderers.webp';
    expect(screen.getByRole('img', { name: producto.nombre }).getAttribute('src')).toBe(esperada);
    fireEvent.click(screen.getByRole('link', { name: /Carrito/i }));
    expect(await screen.findByRole('heading', { name: 'Mi Carrito de Compras' })).toBeTruthy();
    expect(screen.getByRole('img', { name: producto.nombre }).getAttribute('src')).toBe(esperada);
    expect(JSON.parse(localStorage.getItem('cgs_carrito'))).toEqual(carrito);
  });
});
