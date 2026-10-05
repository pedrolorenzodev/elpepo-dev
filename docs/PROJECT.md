# elpepo.dev

Página personal de Pedro en `elpepo.dev`. Muestra sus proyectos de una forma copada, original y
entretenida, en el espíritu de `emalorenzo.com` (la de Ema), pero propia. No es una grilla de cards.

Los proyectos que muestra viven en subdominios de `elpepo.dev`:

| Proyecto | URL |
|---|---|
| Sura (clon pixel-perfect de SURA Gaming) | `sura.elpepo.dev` |
| X-clone (clon de X) | `x-clone.elpepo.dev` |

Se suman los que vengan. Un proyecto nuevo es agregar contenido, no tocar la arquitectura.

## Diseño

**No hay diseño previo.** El diseño se crea desde cero y se implementa con mejores prácticas y una
base limpia. Todo lo no definido pasa por la regla principal de `AGENTS.md` (propuesta con demos
antes de implementar). La fuente de verdad visual será `docs/DESIGN.md`, que se crea tras aprobar la
dirección de diseño.

## Alcance

A definir en la primera propuesta (ver `ROADMAP.md`). Lo que ya se sabe: es un sitio de presentación,
sin backend ni auth por ahora.

## Stack

- Next.js 16.3.5 (App Router) + React 19.2.8 + TypeScript
- Tailwind CSS 4
- npm
- Playwright para screenshots de verificación (`npm run shot`)

## Arquitectura

El código vive en `src/` y el alias `@/*` apunta a `./src/*`.

```
src/app/              solo routing: layouts, pages, metadata, globals.css. Páginas finas.
src/features/         una carpeta por dominio; lo que usa una sola feature vive adentro
src/components/ui/    primitivas reutilizables
src/lib/              utils puros y helpers
```

Las carpetas nuevas (`hooks/`, `types/`, `components/layout/`…) se crean cuando hacen falta.

### Reglas

- **Dirección de dependencias: `app → features → components/ui → lib`.** Nunca al revés.
- **Una feature no importa de otra feature.** Si dos la necesitan, lo compartido sube a
  `components/` o `lib/`.
- **Las rutas son finas.** Componen componentes de feature; la lógica y el markup viven en la feature.
- **Server Components por defecto.** Client Components solo donde la interactividad lo requiere.
- Nombres de archivo en kebab-case, exports nombrados, un componente principal por archivo.

### Principios de trabajo

- Componentizar y reusar antes de escribir código nuevo.
- No sobre-ingeniería: gana lo más simple que siga siendo limpio.
- Nada de abstracciones para un segundo caso de uso que todavía no existe.
