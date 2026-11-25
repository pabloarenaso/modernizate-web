# Catálogo de efectos y componentes elegidos (actualizado 24 nov 2026)

Referencias que eligió Pablo para el sitio y la intranet. Son de Magic UI y Aceternity UI (React/Next.js + Tailwind + Motion), más componentes de Uiverse (HTML/CSS). Regla: el efecto acompaña al texto, nunca compite con él; un solo lenguaje de movimiento; respetar `prefers-reduced-motion`. Revisar si cada componente de Aceternity es gratuito o "Pro" antes de usarlo.

## Fondos
- Nubes en movimiento (ref. Aceternity "Cloud Shader" / datavendor.ai): **modo día**.
- Estrellas y meteoros (Aceternity "Meteors"): **modo noche**.
- Vortex (Aceternity): **panel izquierdo del login**, con los azules de la marca.
- Opciones puntuales: Flickering Grid (Magic UI), Background Lines, Background Boxes, Spotlight, Lamp Effect, Sparkles, Canvas Reveal (Aceternity).
- Gravity Trail (Aceternity): estela del cursor, posible easter egg del modo noche.

## Narrativa al hacer scroll
- Sticky Scroll Reveal (Aceternity): **elegido** para "Cómo trabajamos" y para "Por qué ahora".
- Blur Fade (Magic UI): aparición suave.
- Container Scroll Animation, Hero Parallax (Aceternity): mostrar productos.
- SVG Mask Effect (Aceternity): más adelante.
- Feature Section with Horizontal Skeletons (Aceternity blocks).
- Compare Slider (Aceternity): "antes / después" (planilla manual vs. panel).

## Texto
- Highlighter, Text 3D Flip (Magic UI); Flip Words, Layout Text Flip, Text Reveal Card, Text Flipping Board, Canvas Text, Squiggly Text (Aceternity).
- Wispr Flow text animation (Aceternity labs): texto palabra por palabra.

## Easter eggs (uno por sección)
- Hero: confeti repetible (Cool Mode). Calculadora: título ondulado. Cómo trabajamos: uno por paso (destacador, giro 3D, ondulado, confeti). Contacto: "Actívame" enciende la inclinación 3D de la agenda.
- Idea: la tilde de la marca en 3D como disparador de los easter eggs.

## Uiverse (copiar el código desde uiverse.io; no se puede leer desde el chat)
- Estándar para apps de clientes: ilkhoeri/chilly-sloth-36.
- Sitio: yaasiinaxmed/serious-stingray-77, felipesntr/strange-bobcat-47.
- Easter eggs: barisdogansutcu/proud-lion-79, Pradeepsaranbishnoi/dull-mole-49, Navarog21/ordinary-rat-19, adamgiebl/big-ape-36, MuhammadHasann/silent-lizard-44, AatreyuShau/brown-baboon-8.
- dexter-st/itchy-wolverine-84: "Apriétame" que al abrirse dice "Consulta tu proyecto".
- reglobby/evil-snail-36: panel de estado ("reuniones pendientes", "disposición: ON").
- chase2k25/wet-jellyfish-8: sección "le sacamos una foto a tu negocio", con easter egg.
- KINGFRESS/purple-kangaroo-17: login.
- Por ubicar: cssbuttons-io/wonderful-baboon-62, Bodyhc/ugly-jellyfish-9, reshades/dull-snake-38, simontheonlyone/happy-baboon-60, barisdogansutcu/average-chipmunk-44.

## Botones e interacción
- Interactive Hover Button, Pulsating Button, Cool Mode (Magic UI); Magnetic Button (Aceternity).
- Animated Modal (Aceternity): avisos en la intranet.
- Gooey Waitlist (Aceternity): campo de correo del contacto.
- File Upload, Gooey Input, Loader, Navbar Menu (Aceternity).
- Botón de modo noche con halo (noche) o sombra (día); selector ES/EN al lado.

## Datos y dispositivos
- Animated Circular Progress Bar (Magic UI). Velocímetro semicircular en la calculadora, con el segmento activo agrandado.
- Stats with Gradient (Aceternity).
- iPhone y Android (Magic UI): marcos de dispositivo para las escenas de Soluciones.
- Backlight (Magic UI).

## Tarjetas y galerías
- Comet Card (Aceternity): inclinación 3D de la agenda (solo con el easter egg).
- Draggable Card (Aceternity): galería.

## Bloques completos
- Premium Auth Split (Aceternity): login de la intranet (sin botón de Google, logo y Vortex a la izquierda).
- Blog with Search Magazine (Aceternity): estilo del blog.

## Requisitos de construcción
- Sticky scroll "fijado": la sección queda clavada mientras el scroll avanza los pasos.
- Carrusel del hero (3 escenas) con texto sincronizado, pausa al pasar el mouse, movimiento reducido.
- Sitio bilingüe ES/EN completo.
- Workflow interactivo con React Flow.
- Agenda real conectada al calendario de Pablo: fase posterior.

## Ideas para más adelante
- Vista de conexiones tipo Smartscape (Dynatrace).
- Mascota del blog: personaje de líneas con cabeza en forma de "M" y corbata cobalto, retrato tipo "empleado del mes", que firma las notas semanales.
