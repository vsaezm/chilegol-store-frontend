import { resolverImagen } from '../../data/products';

function mostrarRespaldo({ currentTarget }) {
  const respaldo = resolverImagen();
  if (currentTarget.getAttribute('src') !== respaldo) {
    currentTarget.src = respaldo;
  }
}

export function Image({ src, alt, className = "", ...props }) {
  return <img {...props} src={src} alt={alt} className={`img-fluid ${className}`} onError={mostrarRespaldo} />;
}
