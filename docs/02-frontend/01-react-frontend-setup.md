# React Frontend Setup (Vite + Tailwind + DaisyUI)

## Creating the React App with Vite

- Vite is a fast build tool and dev server for modern frontend apps
- Create the app with:

```text
npm create vite@latest dev-tinder-web
```

- Choose **React** as the framework and **JavaScript** as the variant
- Pick plain JavaScript (not "JavaScript + React Compiler"): the React Compiler auto-optimizes re-renders, which hides how React works. As a learner you want to feel the re-renders and learn `useMemo`/`useCallback` yourself first
- After creating, install dependencies and start the dev server:

```text
npm install
npm run dev
```

- Official guide (follow this for the current steps, as the setup may change over time): [vite.dev/guide](https://vite.dev/guide/)

## Tailwind CSS Setup (v4)

- Tailwind is a utility-first CSS framework
- Install Tailwind and its Vite plugin:

```text
npm install tailwindcss @tailwindcss/vite
```

- Add the plugin in `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- Import Tailwind in `src/index.css`:

```css
@import "tailwindcss";
```

- **Version note**: this is Tailwind **v4**. Older tutorials use v3, which is set up differently (`npx tailwindcss init -p` creates a `tailwind.config.js` and `postcss.config.js`, and the CSS uses `@tailwind base; @tailwind components; @tailwind utilities;`). In v4 there is no config file by default: you use the `@tailwindcss/vite` plugin and a single `@import "tailwindcss";`. Following a v3 tutorial with v4 installed means the config steps will not match and nothing styles
- Official guide (follow this for the current steps, as the setup may change over time): [tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)

## DaisyUI Setup (v5)

- DaisyUI is a component library built on top of Tailwind, giving ready-made classes like `btn`, `card`, `navbar`
- Install it:

```text
npm install daisyui
```

- Register it as a plugin in `src/index.css`, below the Tailwind import:

```css
@import "tailwindcss";
@plugin "daisyui";
```

- **Version note**: in DaisyUI v5 (with Tailwind v4) you register it with `@plugin "daisyui";` in the CSS. Older versions added it to the `plugins` array in `tailwind.config.js`, which no longer exists in this v4 setup
- Official site (follow this for the current steps, as the setup may change over time): [daisyui.com](https://daisyui.com/)
