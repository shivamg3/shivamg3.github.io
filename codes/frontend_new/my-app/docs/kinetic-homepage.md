# Homepage direction: Ideas in motion

The first screen should be an invitation to play, with almost no reading required.

Three possible directions:

| Direction | Experience | Tradeoff |
| --- | --- | --- |
| Kinetic sculpture (implemented) | A custom orange rotor inside machined metal gimbals; drag, pause, and pull apart. | Distinctive engineering identity with a compact procedural scene. |
| Miniature workshop | Move through a small bench with CNC, electronics, and research objects as project portals. | Stronger storytelling, but requires more modeling and navigation work. |
| Shape playground | Responsive objects collide, rearrange, and reveal projects. | More playful; needs care to keep navigation obvious and accessible. |

The starting point uses warm paper, orange, metal, generous space, a three-word heading, and direct links into the existing work, story, and contact pages. No stock imagery, external 3D models, autoplay audio, or remote rendering services are needed.

## Implemented

- A lazy-loaded Three.js scene with a procedural three-ring sculpture, ribbed rotor, and floating components.
- Slow motion, pointer parallax, drag rotation, an exploded view, and pause/play.
- Arrow-key rotation and Enter/Space to toggle the exploded view.
- System reduced-motion preference, including changes during a visit. Explicit play remains available.
- Animation stops while the tab is hidden or the scene is offscreen. GPU pixel ratio is capped.
- A static vector illustration appears during loading and remains available if WebGL fails.
- A separate mobile composition and touch controls. Vertical scrolling remains available.
- Existing content and invitation/scheduling behavior continue through the current routes.

## Local preview

From `codes/frontend_new/my-app`:

```sh
npm ci --legacy-peer-deps
npm run dev
```

The existing maps dependency declares older React peers, so the repository currently requires `--legacy-peer-deps` for installation.

Checks: `npm test` and `npm run build`.

## Next design decisions

1. Evaluate the sculpture direction in motion before investing in the rest of the visual system.
2. Consider replacing the abstract mechanism with recognizable parts from ToolBit or a CNC assembly.
3. Carry the new visual language into a visual project index and individual project scenes.
4. Prepare a matching social preview image and final homepage metadata when the direction is selected.

This branch changes application source. The production site currently also tracks compiled HTML/assets at the repository root; those release files have deliberately not been replaced as part of this first design preview. Review the direction before building and publishing the production release.
