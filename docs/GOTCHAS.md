# Gotchas

Trampas conocidas y el porqué de cada guarda del código (regla 9 de `AGENTS.md`). Cada entrada dice
**qué** muerde, **por qué** y **dónde**. Si una trampa se elimina del código, se elimina de acá.

---

## `npm run typecheck` corre `next typegen` primero

`LayoutProps` y los tipos de rutas son globales y los genera Next en cada build. Con un `tsc --noEmit`
pelado, un clon limpio o un `.next` borrado falla con `Cannot find name 'LayoutProps'`.
**Dónde:** `package.json`, script `typecheck`.

## `src/app` se ignora si existe `app/` en la raíz

Con `src/`, todo el código va adentro. Un `app/` suelto en la raíz hace que Next ignore `src/app`.
**Dónde:** estructura del repo.

## El hook de git bloquea por texto, no por intención

`.claude/hooks/block-dangerous-git.sh` hace `grep` sobre el comando completo, así que cualquier comando de
Bash que *contenga* `git commit`, `git push`, `git tag`, etc. se bloquea, aunque sea parte de un `echo` o de
un archivo que se escribe con `cat`. Para escribir documentación que nombre esos comandos, usar las
herramientas de edición de archivos, no Bash.
**Dónde:** `.claude/hooks/block-dangerous-git.sh`.

## `npm run shot` necesita el servidor corriendo

Saca los screenshots de una URL, no arranca nada. Con `npm run dev` en otra terminal, o `BASE_URL` apuntando
a otro puerto.
**Dónde:** `scripts/shot.mjs`.

## El bloque de `AGENTS.md` sobre Next lo regenera `next dev`

Lo que está arriba de `END:nextjs-agent-rules` se vuelve a escribir solo. Las reglas propias van debajo.
**Dónde:** `AGENTS.md`.
