# Marca Modernízate · tokens

## Personalidad
Ingeniero de alto nivel que explica simple. Elegante pero casual, cercano, honesto, sin presión de venta. Nada de corporativo frío.

## Logo
- Wordmark en mayúsculas: `MODERN` + `I` con tilde + `ZATE`. La tilde es una barra inclinada (`skewX(-38deg)`) en color cobalto sobre la I. Es el símbolo de la marca.
- Fuente del logo: Archivo, ancho 125 (Expanded), peso 800, interletraje levemente cerrado.
- Versiones: cobalto sobre claro (principal), blanco sobre cobalto, marca de agua celeste.
- En modo noche (aprobado 25 nov 2026): el principal usa el color de acento de texto (#8FB0FF, tilde incluida); la marca de agua usa #1F2A47 con tilde #16203D; el invertido va sobre `--primario-relleno`.
- Referencia: `docs/maquetas/Main.dc.html`.

## Colores · modo día
| Token | Hex | Uso |
|---|---|---|
| cobalto | #1F4FE0 | Primario, botones, enlaces, tilde |
| tinta | #0B1530 | Texto principal |
| grafito | #4A5468 | Texto secundario |
| celeste | #DCE6FF | Fondos de acento, chips |
| niebla | #F4F7FC | Fondo de secciones |
| línea | #E2E8F2 | Bordes y divisores |

## Colores · modo noche
| Token | Hex |
|---|---|
| fondo | #0A1022 |
| superficie | #111A33 |
| primario | #3D6BFF |
| texto de acento | #8FB0FF |
| suave | #0D1530 |
| línea | #1F2A47 |
| texto | #E8EDF7 |
| texto secundario | #A3AEC5 |
| celeste | #16203D |
| primario de relleno | #3563F7 |

Suave, línea, texto y texto secundario se tomaron de `docs/maquetas/Landing.dc.html`. Celeste de noche (#16203D) sale del color de selección de esa maqueta (aprobado por Pablo, 25 nov 2026).

## Usos del primario (aprobado 25 nov 2026)
Separados para cumplir AA en modo noche. La paleta de día no cambia.
| Token | Día | Noche | Uso |
|---|---|---|---|
| `--primario-relleno` | #1F4FE0 | #3563F7 | Botones y rellenos con texto blanco encima (blanco sobre #3563F7: 4,91:1) |
| `--acento-texto` | #1F4FE0 | #8FB0FF | Texto y enlaces azules (#8FB0FF sobre el fondo de noche: 8,85:1) |
| `--primario` | #1F4FE0 | #3D6BFF | Solo elementos no textuales: bordes, íconos, foco, trazos |

## Paleta para gráficos (validada para daltonismo)
- Día: #1F4FE0, #D9780A, #0E9F9A, #9B5DE5 (en ese orden, nunca alternado).
- Noche: #5C8BFF, #D07A2A, #119E97, #A37BEB.
- Verde y rojo quedan reservados para estados, siempre con flechas ▲/▼ o texto.
- Las series se usan solo en trazos y rellenos (las series 2 y 3 de día no llegan a 4,5:1). Valores, etiquetas y leyendas usan siempre los colores de texto (`--texto`, `--texto-sec`).

## Tipografía
- Títulos de sección (display): Archivo, ancho 110, peso 800, MAYÚSCULAS (clase `.disp` en la maqueta).
- Subtítulos: Archivo 600.
- Cuerpo y interfaz: Inter 400/500.
- No usar JetBrains Mono ni otras fuentes monoespaciadas decorativas.

## Intranet y admin
- Menú lateral #14287A en ambos modos (referencia `docs/maquetas/Admin.dc.html`).
- Mismas fuentes que el sitio.

## Apps para clientes
Estructura y tipografía de Modernízate; el cliente aporta logo y dos colores (primario y lateral).
