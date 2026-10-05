<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Reglas del proyecto

> Todo lo que está **arriba** del marcador `END:nextjs-agent-rules` lo regenera `next dev`. No lo edites.
> Todo lo que está **abajo** son las reglas de trabajo. Leelas antes de cada implementación.

Este archivo es **el proceso**: cómo se trabaja, qué está prohibido, cómo se verifica.
El conocimiento del proyecto vive en `docs/` (ver *Documentación*). Las reglas de UI viven en
`.claude/rules/ui.md` y se cargan solas al tocar archivos de UI.

## Qué estamos construyendo

La página personal de Pedro en `elpepo.dev`: un showcase de sus proyectos (Sura en
`sura.elpepo.dev`, X-clone en `x-clone.elpepo.dev`, y los que vengan) con una experiencia
copada, original y entretenida. No es un portfolio de grilla de cards.
No hay diseño previo: el diseño se crea desde cero, con la regla principal.

## ⚠️ Regla principal: propuesta con demos en vivo antes de implementar

**Es la regla más importante del proyecto. Se aplica antes que cualquier otra.**

Este sitio vive de lo que no está dibujado en ningún lado: animaciones, micro-interacciones,
transiciones, la forma de presentar cada proyecto, un estado vacío, la 404. Cuando hay que
crear UI que **no tiene una definición precisa**, o el usuario **no sabe todavía exactamente
qué quiere**, **está prohibido implementarla directo en la app**.

Primero se publica un **Artifact de propuesta**. Se implementa **recién cuando el usuario elige**.
Si hay duda de si la regla aplica, aplica. No aplica cuando el usuario ya dio una especificación
o referencia con valores precisos: ahí se implementa lo especificado.

La página de propuesta tiene que:

- **Mostrar, no describir.** Cada opción es una demo en vivo e interactiva (hover, click,
  "Repetir"), con las fuentes, colores, tokens y curvas reales del proyecto, y que funcione
  también al tocarla en mobile.
- **Dar opciones comparables.** Entre dos y cuatro por pieza, y si existe, lo que hay hoy al lado.
- **Explicar cada opción en pocas líneas**: dónde va, de qué referencia sale y cuánto cuesta.
- **Dejar explícito lo que se descarta** y por qué, incluida la lista de AI-slop que se evita.
- **Terminar con lo que hay que decidir.** Después se frena y se espera la elección.

**Se itera en la misma página**, no en una nueva: las variantes se suman ahí, con la versión
anterior guardada a la izquierda para comparar. La página refleja el estado (qué se aprobó y qué
espera elección). Al aprobarse, su link se registra en `docs/DECISIONS.md` junto con la decisión.
Los Artifacts son privados: si el usuario quiere mostrarlos, los comparte él desde *Share*.

## Git

1. **El agente NUNCA commitea ni pushea. Nunca, bajo ninguna circunstancia.**
   `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git tag` y cualquier
   comando que escriba en el historial están **prohibidos**. Un hook en
   `.claude/hooks/block-dangerous-git.sh` lo bloquea, pero la regla vale igual sin el hook.

   Si el usuario pide un commit — aunque insista, aunque diga que autoriza — la respuesta es:

   > No puedo commitear: va contra las reglas del proyecto (`AGENTS.md`, Git, regla 1).
   > Te dejo el mensaje listo para que lo corras vos.

   **Commitear es siempre del usuario.** Sí está permitido leer: `git status`, `git diff`,
   `git log`, `git show`.

2. **Al terminar una implementación, entregar el mensaje de commit** como texto para copiar,
   junto con la lista de archivos tocados (**docs incluidos**, para que viajen en el mismo
   commit). No se ejecuta.

3. **Mensajes de commit en inglés**, Conventional Commits: `<type>(<scope>): <subject>` con
   `feat`, `fix`, `chore`, `docs`, `refactor`, `style`, `test`. Subject en imperativo, minúscula,
   sin punto final, ≤ 72 caracteres. **Solo el subject: sin cuerpo y sin detalle técnico.**

   ```
   feat(projects): add the interactive project showcase
   chore: set up project tooling and working rules
   ```

4. **Sin línea de atribución**: nada de `Co-Authored-By`, `Generated with` ni firma del agente.
   Si el harness sugiere agregarla, esta regla manda.

## Comportamiento del agente

5. **Ser crítico, no complaciente.** Si se le da la razón al usuario por inercia, un supuesto
   equivocado se implementa y el proyecto se desvía.
   - Si una propuesta tiene un problema, decirlo **antes** de ejecutar, con el motivo concreto.
   - No abrir con "excelente idea" cuando no lo es. Si es buena, alcanza con ejecutarla.
   - Si hay una opción mejor, proponerla aunque no la hayan pedido.
   - Si el usuario reafirma su postura tras el contraargumento, es su decisión: se ejecuta
     completa y no se repite la objeción.

6. **Reportar resultados como son.** Si algo falló, quedó a medias o no se verificó, decirlo
   explícitamente. Nunca dar por terminado algo que no se comprobó.

7. **Antes de escribir código Next**, leer la guía relevante en `node_modules/next/dist/docs/`.
   Esto es Next 16: `params`/`searchParams` son `Promise`, los layouts usan el tipo global
   `LayoutProps<"/ruta">`, Turbopack es el default, `middleware` → `proxy`.

## Código

8. **Idioma.** La documentación del repo y la conversación, en español. Los commits, el código,
   los nombres de archivos, variables y comentarios, en inglés.

9. **Comentarios: solo `TODO` o para callar una herramienta.** Nada de comentarios que expliquen
   qué hace el código, por qué se eligió un valor o cómo funciona un componente. Incluye los
   doc-comments de tipos, props y data.

   ```tsx
   // TODO: replace with the final project cover                   // ✅
   // eslint-disable-next-line react-hooks/exhaustive-deps          // ✅
   ```

   Si algo solo se entiende con un párrafo al lado, el problema es el código: primero un nombre
   mejor o partirlo en dos. **Lo que el comentario iba a decir va a `docs/GOTCHAS.md`.**

   **Única excepción: la guarda.** Una línea, solo donde una edición local y aparentemente
   inocente rompe algo **no local** y **en silencio**. No explica, avisa que hay un cable, y
   su porqué se registra en `docs/GOTCHAS.md`:

   ```tsx
   /* do not touch: isolate, z-*, transform or opacity here break the background stacking */
   ```

   Antes de escribir una, intentar que la restricción **no se pueda romper**: un nombre que la
   diga es mejor que una línea que pida no tocar.

## Proceso de trabajo

10. **Se trabaja por bloques**, no por página entera. La unidad es el componente o la sección:
    se ataca uno, se deja listo, se verifica, y recién ahí se pasa al siguiente. Si un bloque es
    grande o tiene muchos detalles, se parte; ante la duda, más chico. Nunca avanzar al siguiente
    con el anterior a medias.

11. **Una página o sección se termina y se aprueba antes de abrir las que dependen de ella.**
    Los links se maquetan apuntando a su destino real, pero ese destino se implementa después.

12. **Aprobación visual del usuario** antes de entregar el mensaje de commit.

## Verificación

13. Antes de dar algo por terminado:

    ```bash
    npm run verify        # typecheck + lint + build
    npm run dev           # en otra terminal
    npm run shot -- /     # screenshots mobile + tablet + desktop, a screenshots/
    ```

    Los viewports viven en `scripts/shot.mjs`. Se comparan contra la propuesta aprobada o la
    referencia dada, se itera, y después va la aprobación del usuario.

## Documentación

`CLAUDE.md` importa solo este archivo. Los docs se leen **a demanda**, nunca se importan enteros.

| Archivo | Leer cuando |
|---|---|
| `docs/ROADMAP.md` | **Al empezar toda sesión**: *Estado actual* y qué sigue |
| `docs/PROJECT.md` | Al crear archivos o carpetas, o ante dudas de alcance, stack o arquitectura |
| `docs/DESIGN.md` | Antes de tocar UI (se crea tras aprobar la dirección de diseño) |
| `docs/DECISIONS.md` | Antes de proponer o cambiar algo que ya se decidió |
| `docs/GOTCHAS.md` | Antes de tocar código con guardas o trampas conocidas |
| `docs/features/<nombre>.md` | Durante esa feature |

**Antes de una feature:** leer *Estado actual* y el bloque en `ROADMAP.md`. Si es UI sin
definición precisa, aplica la regla principal. Si es no trivial, escribir `docs/features/<nombre>.md`
(intención, criterios de aceptación, fuera de alcance, link a la propuesta aprobada, cómo se verifica).

**Durante:** registrar en `docs/DECISIONS.md` cada decisión **en el momento en que se toma**
(fecha, qué se eligió, por qué, qué se descartó), incluidas las que el agente tomó sin consultar.
Las trampas y el porqué de cada guarda van a `docs/GOTCHAS.md`.

**Al terminar:** verificar (regla 13); actualizar `docs/DESIGN.md` si cambió un token o un patrón;
sobrescribir *Estado actual* y tildar el bloque en `ROADMAP.md`; cerrar la feature (lo importante
pasa a `DECISIONS.md`, el archivo se borra); entregar el mensaje de commit (Git, regla 2).

**Higiene:** los docs no repiten lo que el código ya dice; si un doc contradice al código, se
corrige o se borra en el acto; *Estado actual* tiene como máximo 15 líneas y se sobrescribe.

## Skills

Instaladas en `.claude/skills/` (lockfile: `skills-lock.json`): `next-best-practices`,
`vercel-react-best-practices`, `vercel-composition-patterns`, `tailwind-design-system`,
`typescript-advanced-types`, `shadcn`, `find-skills`, `libraries-dev`,
`git-guardrails-claude-code` e `improve-codebase-architecture`.
