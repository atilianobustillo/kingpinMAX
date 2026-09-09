# Cómo pasarle esto a Claude Code

## Por qué en varios pasos y no todo de una vez

Es tentador pegarle a Claude Code un solo mensaje gigante pidiendo "arma
todo el sitio". No lo hagas — con esta cantidad de páginas y contenido, un
solo prompt gigante hace que tome decisiones de diseño y contenido sin que
las revises hasta el final, cuando ya es más caro corregir. Mejor: un
prompt por fase, revisando el resultado antes de seguir a la siguiente.

## Paso 0 — Prepara la carpeta

Copia `BRIEF-KINGPINMAX.md` y la carpeta `assets/` completa a la raíz de tu
proyecto (o a una carpeta `kingpinmax-brief/` dentro de él). Abre `claude`
en la terminal, parado en la carpeta de tu proyecto.

## Paso 1 — Dale el contexto (pégalo primero, solo)

```
Voy a construir/reestructurar el sitio de kingpinMAX. Antes de que toques
código, lee completo BRIEF-KINGPINMAX.md — tiene todo lo que ya definimos
sobre el producto, la arquitectura del sitio y el sistema visual. Es
información validada conmigo directamente, no la reinterpretes ni la
resumas de otra forma.

Una vez lo hayas leído, dime en tus palabras: (1) qué es el producto y por
qué es un kit único sin variantes por estado, y (2) cuáles son las 7
piezas del kit. Quiero confirmar que lo entendiste bien antes de que
generemos ninguna página.
```

Revisa su respuesta. Si algo quedó mal entendido, corrígelo ahí mismo
antes de seguir — todo lo que construya después parte de esta base.

## Paso 2 — Estructura del sitio (esqueleto, sin contenido final)

```
Perfecto. Ahora arma el esqueleto de navegación del sitio según el árbol
de la sección 6 del brief: Home, How It Works, KPRA/KCRT Reference, Shop,
About, y las páginas del footer (FAQ, Guía de instalación, Envíos y
devoluciones, Contacto, Términos, Disclaimer). Mi sitio es HTML/CSS plano
[ajusta si no es así]. Por ahora solo necesito la navegación funcionando
entre páginas vacías o con un placeholder — el contenido real lo vamos a
ir llenando página por página en los siguientes pasos. Usa el sistema
visual de la sección 7 del brief (colores con significado, tipografía
condensada + monoespaciada) para el header/nav y cualquier elemento común.
```

## Paso 3 — Home

```
Ahora construye Home. El mensaje central: "instala una vez, cubierto
donde sea que manejes" — NO "encuentra tu estado" (eso ya no aplica, el
kit es único). Usa el tono de la sección 7 del brief: directo, orientado
a evitar la multa DOT, sin prometer garantía legal absoluta. Puedes usar
seccion-abanico.html de assets/ como imagen decorativa de portada (aclara
en el brief que ya NO es un selector, solo vista previa visual del kit).
Incluye un CTA claro a Shop.
```

## Paso 4 — How It Works

```
Construye How It Works siguiendo el orden de la sección 2 y el árbol de
la sección 6 del brief: el problema y la solución, las 7 piezas del kit
explicadas una por una, un diagrama de instalación (disposición real en
la pared — la Compliance Guide va unas pulgadas sobre las marcas 40'/41'),
y los specs de material/durabilidad. Si necesitas los specs físicos
(peso máximo, material, ajuste al trailer, visibilidad), están en
tabla-kpra-kcrt-oscura.html dentro de assets/, en la sección
.kpra-specs-dark — reutiliza ese contenido.

Nota: NO tengas por resuelto si el sticker 43' de MA/MN/WI es una pieza
separada — está marcado como pendiente en la sección 9 del brief.
Pregúntame antes de listarlo como una pieza más.
```

## Paso 5 — KPRA/KCRT Reference

```
Construye la página KPRA/KCRT Reference. Es el destino del código QR de
la Compliance Guide (sección 5 del brief), así que priorizo que se vea
bien en celular por encima de desktop. Usa kpra-kcrt-diagram.svg y el
contenido de tabla-kpra-kcrt.html (o la versión oscura si el fondo de
esta página es oscuro) de la carpeta assets/ como base. Incluye el texto
legal completo de la sección 4 del brief, sin resumirlo ni reescribirlo.
```

## Paso 6 — Shop

```
Construye Shop como página de producto único (no hay selector de estado,
es un solo SKU). Necesito selector de cantidad para diferenciar compra
individual de paquete para flota. [Aquí dile con qué vas a procesar el
pago: Shopify, Stripe, WooCommerce, etc. — no está definido en el brief,
así que Claude Code no puede asumirlo].
```

## Paso 7 — About, FAQ, y el resto del footer

```
Ahora arma About, FAQ, y las páginas restantes del footer. El contenido
específico de estas no está definido en el brief (sección 9) — antes de
inventar texto, pregúntame qué quiero que digan, o dame un borrador
claramente marcado como "borrador a confirmar" que pueda revisar.
```

## Nota general

En cada paso, si Claude Code se topa con algo de la sección 9 del brief
(pendientes), dile explícitamente que te pregunte a ti en vez de asumir —
son decisiones de negocio, no de diseño.
