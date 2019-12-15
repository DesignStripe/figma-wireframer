# Wireframer Figma plugin

![Promo image](/assets/demo-image.jpg)

Wireframer can be the new trend in wireframes text generation process. 🧨

It can aid both high fidelity and quick messy wireframes by generating cool & unique SVG placeholder. Another use case can be isometric illustrations.

Adjust the parameters and get back a unique cool placeholder text!

For more option check the web app: https://www.wireframer.art

## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `New Plugin...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings

This repo is using:

- React + Webpack
- TypeScript
- TSLint
- Prettier precommit hook
