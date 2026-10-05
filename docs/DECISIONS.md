# Decisiones

Registro de decisiones, la más nueva arriba. Se agrega **en el momento en que se toma** la decisión,
incluidas las que el agente tomó sin consultar. Si una decisión se revierte, no se borra: se marca
`Reemplazada por` y se agrega la nueva.

Formato de cada entrada: **qué se eligió · por qué · qué se descartó**. Las propuestas aprobadas
llevan su link.

---

## 2026-10-05 · Sistema de documentación para trabajar con agentes

**Se eligió:** `AGENTS.md` corto (proceso, <200 líneas) + `.claude/rules/ui.md` (carga por ruta) +
`docs/` con `PROJECT`, `ROADMAP` (con *Estado actual* como traspaso), `DECISIONS`, `GOTCHAS`, `DESIGN`
(tras aprobar la dirección) y `features/<nombre>.md` por feature no trivial. `CLAUDE.md` importa solo `AGENTS.md`.

**Por qué:** Anthropic recomienda menos de 200 líneas en `CLAUDE.md` y cargar lo demás a demanda; lo
importado con `@` cuesta contexto igual. Un estudio (arXiv 2602.11988) midió que los resúmenes del repo
no ayudan y suben el costo. Se documenta solo lo que el agente no puede deducir del código.

**Se descartó:** un `PRD.md` único e importado (el de Sura llegó a 2.635 líneas); un `STATE.md` aparte
(un archivo más que se desactualiza, está dentro de `ROADMAP.md`); un archivo por decisión tipo ADR (demasiada
ceremonia para un proyecto individual).

## 2026-10-05 · `DESIGN.md` como fuente de verdad visual

**Se eligió:** formato de Google Labs (tokens en YAML + razonamiento en prosa), creado después de aprobar la
dirección de diseño y no antes. Se valida con su CLI (`npx @google/design.md lint`).

**Por qué:** no hay Figma, así que lo aprobado en las propuestas tiene que quedar escrito donde el agente lo
lea. El lint de contraste y la exportación a Tailwind evitan que el doc y el código se separen.

**Se descartó:** markdown libre. El formato es alfa (abril de 2026): si molesta, se reevalúa.

## 2026-10-05 · Reglas de trabajo derivadas de Sura y x-web

**Se eligió:** las reglas de git, comportamiento, comentarios, tokens, Tailwind en el `className`, trabajo por
bloques y verificación; la propuesta con demos en vivo pasa a ser la regla principal.

**Por qué:** son las que ya funcionaron en Sura y x-web.

**Se descartó:** los dos únicos breakpoints (se quiere responsive excelente en todos los tamaños), datos
hardcodeados en `lib/data/`, todo lo específico de Figma, "desktop primero", y la limitación del movimiento a
hover y focus (acá el movimiento es central).

## 2026-10-05 · Estructura `src/` por features

**Se eligió:** `src/app` fino + `src/features` + `src/components/ui` + `src/lib`, con dependencias en un
solo sentido y sin imports entre features. Alias `@/*` → `./src/*`.

**Por qué:** la documentación de Next es neutral sobre `src/`; lo elegimos para separar el código de las
configs y porque la organización por dominio es el consenso para proyectos medianos. `x-web` ya la usa.

**Se descartó:** estructura en la raíz sin `src/` (la de Sura) y repartir el código por ruta dentro de `app/`.
