---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# Reglas de UI

Se cargan solas al tocar archivos de UI. Complementan `AGENTS.md`; la **regla principal** (propuesta
con demos antes de implementar) manda sobre todo lo de acá.

## Tokens y estilos

- **Cero valores de estilo hardcodeados.** Todo sale de los tokens de `@theme` en
  `src/app/globals.css`. Si hace falta un valor que no existe como token: primero se agrega el
  token, se documenta en `docs/DESIGN.md`, y recién después se usa.
- **Tailwind en el `className` del elemento, siempre.** Prohibido `style={{...}}`, CSS Modules,
  `<style>` y `@apply` en archivos aparte.

  ```tsx
  <div className="flex gap-4 rounded-md bg-card p-6">   // ✅
  ```

  Única excepción: un valor genuinamente calculado en runtime, pasado como CSS custom property
  para que Tailwind lo siga controlando:

  ```tsx
  <div className="h-[var(--row-h)]" style={{ "--row-h": `${h}px` } as React.CSSProperties}>
  ```

## Responsive

- **Excelente en todos los tamaños.** Mobile-first: los estilos base son mobile y los breakpoints
  de Tailwind (`sm:`, `md:`, `lg:`…) suman. Ningún bloque se da por listo sin verlo en mobile,
  tablet y desktop (`npm run shot`).
- **Cómo se reparte el trabajo entre tamaños dentro de un bloque.** La decisión la toma el agente,
  con todos los tamaños a la vista, y se informa qué se eligió y por qué:

  | Caso | Cómo se encara |
  |---|---|
  | UI parecida en todos los tamaños | **Todos juntos, una sola tarea.** Es el default. |
  | UI radicalmente distinta | **Componentes separados**, cada uno oculto fuera de su rango. |
  | Mismo markup, layout muy distinto | **Pases en orden creciente: mobile primero**, después los mayores. |

  Criterio: *¿es el mismo markup reordenado, o son dos cosas distintas?* Ante la duda, son
  componentes distintos. Mirar siempre todos los tamaños antes de escribir la primera clase.
  Mobile primero porque los breakpoints son `min-width`: no pueden filtrarse hacia abajo.

## Componentes

- **Primitives con shadcn siempre que exista uno adecuado**, markup crudo solo si no hay. Se
  re-estilan con nuestros tokens, no al revés. shadcn se instala con su CLI cuando hace falta, no
  preventivamente. Consultar la skill `shadcn` antes de usarlo.
- **No extender preventivamente.** Tokens, componentes y abstracciones se crean solo cuando una
  pieza concreta los necesita.

## Movimiento

- **El movimiento es parte central del sitio**, no se limita a hover y focus. Toda animación o
  interacción no trivial pasa por la **regla principal**: propuesta con demos antes de implementar.
- Respetar siempre `prefers-reduced-motion`.
- Si hace falta una librería de motion, se decide en una propuesta, no preventivamente.
