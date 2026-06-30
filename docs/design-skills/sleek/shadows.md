# Shadows

| Token | CSS value |
|---|---|
| shadow-2xs | `0 1px #0000000d` |
| shadow-xs | `0 1px 2px 0 #0000000d` |
| shadow-sm | `0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a` |
| shadow-md | `0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a` |
| shadow-lg | `0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a` |
| shadow-xl | `0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a` |
| shadow-2xl | `0 25px 50px -12px #00000040` |

## Component Mapping

| Component type | Token |
|---|---|
| Subtle separators, tiny UI details | shadow-2xs or shadow-xs |
| Buttons, small controls | shadow-xs |
| Cards, inputs, lightweight containers | shadow-sm |
| Popovers, dropdowns | shadow-md |
| Prominent cards, sticky surfaces | shadow-lg |
| Modals, high-priority overlays | shadow-xl |
| Hero overlays, top-level emphasis (sparingly) | shadow-2xl |

## Rules

- Use only these tokens — no custom box-shadow values
- Keep elevation steps intentional; avoid jumping multiple levels
- Components in the same family share the same baseline elevation
- Hover/focus on interactive elevated elements: step up by one level
- Never stack multiple shadow tokens on one element
- Never use shadow-xl/shadow-2xl for dense list items or body containers
