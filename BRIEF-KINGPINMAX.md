# Brief de producto y arquitectura — kingpinMAX

Este documento resume todo lo que se definió sobre el producto y el sitio
antes de empezar a construir. Léelo completo antes de tocar código: varias
decisiones aquí corrigen suposiciones más simples con las que se pudo haber
arrancado (por ejemplo, esto NO es un catálogo de productos por estado).

## 1. Qué es el producto

kingpinMAX vende un kit de cumplimiento para trailers: un set de stickers
que se instalan en la pared del trailer y sirven como referencia visual de
la distancia kingpin-eje según la normativa de cada estado/país.

**Punto clave: es un solo producto, no uno por estado.** El kit es una sola
lámina de vinil con TODAS las marcas incluidas. La razón: un trailer opera
en múltiples estados y cruza fronteras (USA/Canadá/México), así que se
instala el conjunto completo en la pared y el conductor o el inspector lee
la referencia que aplica según dónde esté en cada momento. El cliente
decide qué pegar, pero el kit se vende completo, siempre igual, sin
variantes por estado.

Esto significa que **Shop no necesita selector de estado ni catálogo de
variantes** — es una página de producto único, con variante de cantidad
(kit individual vs. paquete para flota).

## 2. Las 7 piezas del kit

1. **Sticker 40'** — rojo, California, "Strict Enforcement". Método KPRA.
2. **Sticker 41'** — negro con recuadro blanco tipo señal vial. Estándar
   federal/norteamericano: USA (STAA), Canadá (MOU), México (SCT/NOM-012).
   Método KCRT. Es el default para operación transfronteriza. Muestra
   también la conversión a 12.5 m.
3. **Sticker 43'** — negro. Método KPRA. Aplica a CT, IN, ME, NY (estos
   estados permiten hasta 43' bajo el mismo método KPRA que usa California,
   solo que California es más estricta y limita a 40').
   ⚠️ **Pendiente de confirmar con el cliente**: la tabla de referencia
   también lista un grupo "43' KCRT — MA, MN, WI", pero en el arte físico
   solo se ve UN sticker de "43'" (etiquetado KPRA). No está confirmado si
   MA/MN/WI necesita un sticker físico separado o si comparten el mismo.
   No asumas la respuesta — pregúntale a Atiliano antes de construir esa
   parte del catálogo/kit contents.
4. **Kingpin Zero Point** — marcador (banner negro vertical) que señala
   físicamente el punto exacto desde el que se miden todas las distancias.
5. **Warning sticker** — aviso de seguridad (fondo naranja, ícono de pin
   tachado): "PINS MUST BE FULLY ENGAGED BEFORE OPERATING". No mide
   distancia, es prevención de accidentes. Va cerca de las demás piezas.
6. **Installation Reference Plate** — placa de registro: fecha de
   instalación, referencia de ajuste de kingpin (checkbox "36\" KP" u
   "Other"), quién instaló, método de verificación (cinta métrica u otro).
7. **Bridge Law & Weight Compliance Guide** — TAMBIÉN es un sticker de
   pared (no un inserto de papel). Se instala unas pulgadas por encima de
   las marcas 40'/41'. Contiene el diagrama KPRA/KCRT, la tabla completa,
   el disclaimer legal, el peso máximo del tandem (34,000 lb / 15,422 kg),
   y un código QR.

## 3. Tabla de referencia (contenido ya validado)

| Distancia | Código | Mide (de → a)                          | Aplica a                          |
|-----------|--------|------------------------------------------|------------------------------------|
| 40'       | KPRA   | Kingpin → centro del eje trasero          | California (strict enforcement)   |
| 41'       | KCRT   | Kingpin → centro del tandem trasero       | Federal — USA · Canadá · México   |
| 43'       | KPRA   | Kingpin → centro del eje trasero          | CT · IN · ME · NY                 |
| 43'       | KCRT   | Kingpin → centro del tandem trasero       | MA · MN · WI *(ver pendiente §2)* |

- KPRA = Kingpin to (Center of) Rearmost Axle
- KCRT = Kingpin to Center of Rear Tandem
- Las cinco jurisdicciones que miden por KPRA son CA, CT, IN, ME, NY —
  California solo difiere en el límite permitido (40' vs 43'), no en el
  método de medición.

## 4. Texto legal ya redactado (usar tal cual, no reescribir el sentido)

> This measurement kit is a reference guide for axle positioning and does
> not exempt the operator for compliance with local, state, or federal
> laws. Regulations regarding KPRA (Kingpin to Rearmost Axle) and KCRT
> (Kingpin to Center of Rear Tandem) are subject to change and may vary
> depending on the specific route (STAA vs. Non-designated roads). The
> manufacturer is not responsible for fines, citations, or accidents
> resulting from improper installation or misinterpretation of these
> markings. Always verify current DOT regulations for your specific route.

Este disclaimer debe aparecer en la página KPRA/KCRT Reference y en el
footer de todo el sitio.

## 5. El código QR

La Compliance Guide (pieza #7) trae un QR que hoy no apunta a nada — hay
que construir la página destino. La intención: una tabla viva y
actualizable con la normativa de todos los estados de USA, Canadá y México,
más el estándar de cruce de frontera. Esa página destino ES la página
"KPRA/KCRT Reference" del sitio (ver árbol abajo). Por eso esa página debe
pensarse **mobile-first**: alguien la va a abrir parado junto al trailer,
escaneando con el celular, no navegando cómodo desde su casa.

## 6. Árbol de navegación final

```
kingpinMAX.com
│
├── Home
│
├── How It Works
│   ├── El problema y la solución (un panel completo, se instala una vez)
│   ├── Las 7 piezas del kit, explicadas
│   ├── Diagrama de instalación (disposición real en la pared)
│   └── Specs de material/durabilidad
│
├── KPRA/KCRT Reference   ← destino del QR, mobile-first
│   ├── Tabla viva: USA, Canadá, México, todos los estados
│   ├── Diagrama del mecanismo KPRA vs KCRT
│   ├── Estándar de cruce de frontera
│   └── Disclaimer legal (texto de la sección 4)
│
├── Shop
│   └── Producto único + cantidad (individual / paquete flota) + checkout
│
├── About kingpinMAX
│
└── Footer
    ├── FAQ
    ├── Guía de instalación (PDF descargable, opcional)
    ├── Envíos y devoluciones
    ├── Contacto/Soporte
    ├── Términos y privacidad
    └── Disclaimer de cumplimiento
```

Nota: "How It Works" y lo que originalmente iba a ser "Kit Contents" se
fusionaron en una sola página por decisión explícita de Atiliano — no las
vuelvas a separar sin que él lo pida.

## 7. Sistema visual ya definido

- **Colores con significado, no decorativos**: rojo (#e0342b / #ff5b50 en
  fondo oscuro) SOLO para lo de aplicación estricta (California). Ámbar
  (#f4b942) para lo federal/transfronterizo y para las líneas de medición
  en diagramas. Gris neutro para el resto — no introduzcas un color nuevo
  sin razón.
- **Tipografía**: sans condensada en bold para titulares, monoespaciada
  (estilo 'Courier New') para números/datos — refuerza la sensación de
  "ficha técnica oficial". Mantenlo así en todo el sitio.
- **Tono del copy**: directo, orientado a evitar la multa/citación DOT,
  sin prometer garantía legal absoluta (evita frases tipo "100% legal" —
  el kit es una referencia, no una certificación; el disclaimer de la
  sección 4 es la razón).
- **Audiencia**: tanto owner-operators individuales como flotas que
  compran en volumen — el copy debe hablarle bien a ambos.

## 8. Assets ya construidos (carpeta `assets/`)

- `sticker-40-california.png`, `sticker-41-federal.png`,
  `sticker-43-noreste.png` — los tres stickers de distancia, recortados
  limpio con transparencia.
- `sticker-ghost.png` — silueta gris sin texto, decorativa, para efecto de
  "hay más piezas" sin tapar contenido real.
- `kpra-kcrt-diagram.svg` — diagrama vectorial del mecanismo KPRA vs KCRT
  (sin números específicos a propósito, para que no quede desactualizado).
  Pensado para la página KPRA/KCRT Reference.
- `tabla-kpra-kcrt.html` — tabla de referencia, versión clara/fondo blanco.
- `tabla-kpra-kcrt-oscura.html` — misma tabla, versión oscura tipo "vidrio
  esmerilado" para ir sobre foto/fondo oscuro, incluye además los specs
  (peso máx., material, ajuste al trailer, visibilidad).
- `seccion-abanico.html` — composición de los 3 stickers en abanico sin
  taparse entre sí. **Ojo**: este asset se diseñó originalmente pensando
  en "elige tu estado", lo cual ya no aplica. Sigue siendo útil como
  imagen decorativa de portada ("esto es lo que incluye el kit"), pero
  NO debe presentarse como un selector — es solo una vista previa visual.

## 9. Pendientes que no están resueltos todavía

- Confirmar si MA/MN/WI necesita un sticker físico separado (ver §2).
- Idioma del sitio: el borrador de hero visto hasta ahora está en inglés;
  no está confirmado si el sitio final es solo inglés o bilingüe.
- Plataforma de checkout (Shopify, Stripe, WooCommerce, etc.) no definida.
- Precio de venta, garantía/vida útil del vinil, y si el producto ya está
  en producción — no confirmados.
- Contenido de About, FAQ, y política de envíos — no redactado aún.
- URL final de destino del QR.

No inventes respuestas para estos puntos — pregúntale a Atiliano.
