// Pruebas 2 y 3: ProductCard muestra lo que recibe por props y avisa cuando se agrega al carrito.

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../components/molecules/ProductCard';
import { resolverImagen } from '../../data/products';
import { mockProductos } from '../mocks/datos';

function dibujar(producto, onAgregar = () => {}) {
  return render(
    <MemoryRouter>
      <ProductCard product={producto} onAgregar={onAgregar} />
    </MemoryRouter>
  );
}

describe('ProductCard (molécula)', () => {
  it('2. muestra el nombre, el precio y el stock que recibe por props', () => {
    dibujar(mockProductos[0]);

    expect(screen.getByRole('link', { name: 'Camiseta Mock Local' })).toBeTruthy();
    expect(screen.getByText('$49.990')).toBeTruthy();
    expect(screen.getByText('Stock: 10')).toBeTruthy();
  });

  it('3. al hacer clic en "Agregar al carrito" ejecuta onAgregar con el producto', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    dibujar(mockProductos[0], onAgregar);

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    expect(onAgregar).toHaveBeenCalledOnceWith(mockProductos[0]);
  });

  it('muestra el respaldo si falla la imagen y evita volver a solicitarlo si también falla', () => {
    dibujar(mockProductos[0]);
    const imagen = screen.getByRole('img', { name: mockProductos[0].nombre });
    fireEvent.error(imagen);
    expect(imagen.getAttribute('src')).toBe(resolverImagen('sin-imagen.svg'));

    const asignarSrc = spyOnProperty(imagen, 'src', 'set');
    fireEvent.error(imagen);
    expect(asignarSrc).not.toHaveBeenCalled();
  });
});
