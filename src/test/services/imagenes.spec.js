import { actualizarProducto, getProductos, imagenesDisponibles, productosIniciales, resolverImagen } from "../../data/products";

describe("Resolución de imágenes", () => {

  it("resuelve un nombre de archivo simple", () => {
    const ruta = resolverImagen("goku-colocolo.webp");

    expect(ruta).toBe(import.meta.env.BASE_URL + "images/goku-colocolo.webp");
  });

  it("normaliza una ruta con el prefijo images", () => {
    expect(
      resolverImagen("images/goku-colocolo.webp")
    ).toBe(
      resolverImagen("goku-colocolo.webp")
    );
  });

  it("normaliza rutas antiguas del repositorio", () => {
    expect(
      resolverImagen("/tienda_ropa/images/goku-colocolo.webp")
    ).toBe(
      resolverImagen("goku-colocolo.webp")
    );
  });

  it("normaliza referencias antiguas a public", () => {
    expect(
      resolverImagen("/public/images/goku-colocolo.webp")
    ).toBe(
      resolverImagen("goku-colocolo.webp")
    );
  });

  it("utiliza una imagen predeterminada cuando el valor es null", () => {
    expect(
      resolverImagen(null).endsWith("/images/sin-imagen.svg")
    ).toBe(true);
  });

  it("utiliza una imagen predeterminada cuando el valor está vacío", () => {
    expect(
      resolverImagen("").endsWith("/images/sin-imagen.svg")
    ).toBe(true);
  });

  it("codifica correctamente nombres con caracteres especiales", () => {
    expect(
      resolverImagen("vegeta-uespañola.webp").endsWith(
        "/images/vegeta-uespa%C3%B1ola.webp"
      )
    ).toBe(true);
  });

  it("rechaza nombres con separadores de ruta codificados", () => {
    for (const nombre of ["archivo%2Fimagen.webp", "archivo%5Cimagen.webp", "%2e%2e", "%ZZ"]) {
      expect(resolverImagen(nombre)).toBe(resolverImagen("sin-imagen.svg"));
    }
  });

  it("recupera la camiseta del club si se guardó con un nombre retirado", () => {
    const anteriores = [
      ["camiseta-colo-colo.webp", "goku-colocolo.webp"],
      ["camiseta-universidad-de-chile.webp", "goku-udechile.webp"],
      ["camiseta-universidad-catolica.webp", "goku-ucatolica.webp"],
      ["camiseta-cobreloa.webp", "goku-cobreloa.webp"],
    ];
    for (const [anterior, vigente] of anteriores) {
      expect(imagenesDisponibles).not.toContain(anterior);
      expect(imagenesDisponibles).toContain(vigente);
      expect(resolverImagen("/tienda_ropa/images/" + anterior)).toBe(resolverImagen(vigente));
    }
  });

  it("lee el catálogo antiguo intacto y guarda solo el nombre al editar", () => {
    const ruta = "/tienda_ropa/public/images/vegeta-uespa%C3%B1ola.webp?v=2#foto";
    const catalogo = [{ ...productosIniciales[5], imagen: ruta }, productosIniciales[0]];
    const original = JSON.stringify(catalogo);
    localStorage.setItem("cgs_productos", original);

    const [guardado] = getProductos();
    const esperada = import.meta.env.BASE_URL + "images/vegeta-uespa%C3%B1ola.webp";
    expect(resolverImagen(guardado.imagen)).toBe(esperada);
    expect(localStorage.getItem("cgs_productos")).toBe(original);

    actualizarProducto(guardado.id, { nombre: "Camiseta editada" });
    const [editado, otro] = getProductos();
    expect(editado.imagen).toBe("vegeta-uespa%C3%B1ola.webp");
    expect(resolverImagen(editado.imagen)).toBe(esperada);
    expect(otro).toEqual(catalogo[1]);
  });
});
