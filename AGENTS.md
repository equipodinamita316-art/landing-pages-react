# AGENTS.md

Repositorio de landing pages hechas con **React**. Solo contiene landing pages de React, cada una en su propia carpeta en la raíz.

## Stack común

- React 19 + Vite + Tailwind CSS v4
- `framer-motion` — animaciones de scroll y entradas
- `three` + `@react-three/fiber` + `@react-three/drei` — escenas 3D
- Linter/typecheck: **oxlint** (no hay typecheck ni tests)

## Run / verify

En `C:\Users\CBTIS121` (Windows) el `npm.ps1` está bloqueado por Execution Policy: **usar siempre `npm.cmd`**, nunca `npm`.

- Instalar: `npm.cmd install`
- Dev: `npm.cmd run dev` → http://localhost:5173
- Build: `npm.cmd run build`
- Lint: `npm.cmd run lint`

## Estructura

- `universo/` — primera landing page (tema espacio/planetas con planeta 3D rotando). Sirve de referencia de patrones.
- Cada landing page nueva = carpeta propia en la raíz con su `package.json`, sin instalar dependencias compartidas a nivel raíz.

## Convenciones

- Interfaz en español.
- Fondo cósmico reutilizable: `Starfield` (canvas que reacciona al mouse) + `Nebula` (blobs flotantes) + paleta en `@theme` de `index.css`.
- Texturas de planetas generadas **proceduralmente** (`CanvasTexture` en `SolarPlanet.jsx`), sin imágenes externas.
- Escena 3D en un componente separado y cargada con `React.lazy` para dividir el bundle de `three`.
- `framer-motion` para reveal con `whileInView`.

## Gotchas (no romper)

- **React está fijado en 19.2.0 exacto** (sin caret): `@react-three/fiber@^9.7` exige `react <19.3`. No subir React a 19.3+ o `npm.cmd install` fallará con ERESOLVE.
- No hacer commit/push salvo que el usuario lo pida explícitamente.