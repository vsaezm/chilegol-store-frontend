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

  for (const [caso, contenido] of [['JSON incompleto', '[{'], ['un objeto en lugar de una lista', '{}']]) {
    it('permite abrir la tienda si el carrito contiene ' + caso, () => {
      localStorage.setItem('cgs_carrito', contenido);
      abrir('/carrito');
      expect(screen.getByRole('heading', { name: 'Tu carrito está vacío' })).toBeTruthy();
      expect(localStorage.getItem('cgs_carrito')).toBe(contenido);
    });
  }

  it('recupera las líneas válidas y guarda el cambio de cantidad sin alterar el catálogo', () => {
    const producto = mockProductos[0];
    const catalogo = JSON.stringify([producto]);
    const carrito = [null, { ...producto, id: 2, cantidad: -1 }, { ...producto, precio: '49990', cantidad: '2' }];
    localStorage.setItem('cgs_productos', catalogo);
    localStorage.setItem('cgs_carrito', JSON.stringify(carrito));

    abrir('/carrito');
    expect(screen.getByText('$99.980', { selector: '.linea__subtotal' })).toBeTruthy();
    expect(localStorage.getItem('cgs_carrito')).toBe(JSON.stringify(carrito));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(JSON.parse(localStorage.getItem('cgs_carrito'))).toEqual([{ ...producto, cantidad: 3 }]);
    expect(localStorage.getItem('cgs_productos')).toBe(catalogo);
  });

  it('permite agregar y consultar un producto si el navegador bloquea localStorage', async () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('Lectura bloqueada');
    spyOn(Storage.prototype, 'setItem').and.throwError('Escritura bloqueada');
    abrir('/products/1');
    fireEvent.click(screen.getByRole('button', { name: /Agregar al Carrito/i }));
    fireEvent.click(screen.getByRole('link', { name: /Carrito/i }));
    expect(await screen.findByRole('heading', { name: 'Mi Carrito de Compras' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Camiseta Colo-Colo 2026' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '+' })).toBeTruthy();
  });
});
