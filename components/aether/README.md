# Aether Design System

## Quick Start

```tsx
// Import components
import { 
  Button, Card, Input, Checkbox, Label,
  Bubble, Breadcrumb, DropdownMenu, Drawer, HoverCard,
  Empty, Attachment, Field, Item, Kbd,
  Tooltip, Modal, Toast, ToastContainer, ContextMenu,
  Spinner, ProgressBar, Badge, Divider, Avatar, ConfirmDialog,
  FunctionalColorsToggle, DesignSystemChecklist,
  ActivityBar, TabBar, StatusBar, Terminal, Resizer,
  SearchPanel, DiagnosticsPanel, GitPanel, DebugPanel, PluginPanel,
  KeyboardShortcutsOverlay, NotificationCenter,
  DiffViewer, CodeBlock, Minimap, DatasetBrowser, FileUploadZone,
} from '@/components/aether'

// Import design tokens
import { 
  PHI, FIBONACCI, SPACING, DURATION, RADIUS, BLUR, OPACITY,
  DARK_LAYERS, FUNCTIONAL_COLORS, GRADIENTS, SHADOWS, MOTION,
  M3_COLOR_MAP, M3_ELEVATION_MAP, M3_STATE_MAP, M2_TEXT_EMPHASIS,
} from '@/styles/aether-design-system'
```

## The Beauty of Darkness

The UI is pure dark by default — no white mode, no light theme.
All colors are monochrome (zinc/neutral). The eye rests in darkness.

To reveal functional accent colors (violet, emerald, amber, red, blue):

```tsx
const [colorsOn, setColorsOn] = useState(false)

<FunctionalColorsToggle enabled={colorsOn} onToggle={setColorsOn} />
```

When ON:  golden-angle hues appear at 270°, 145°, 38°, 8°, 210°
When OFF: everything maps to neutral — pure darkness

## Fibonacci × Da Vinci

Every value is mathematically derived:

| System | Values |
|--------|--------|
| Spacing | 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987 px |
| Font sizes | 8, 10, 13, 16, 21, 34, 55, 89, 144 px |
| Line height | font-size × φ (1.618) |
| Border radius | 3, 5, 8, 13, 21, 34, 55, 89 px |
| Blur | 3, 5, 8, 13, 21, 34, 55 px |
| Opacity | F(n)/1000: 0.1%, 0.5%, 0.8%, 1.3%, 2.1%, 3.4%, 5.5%, 8.9%, 14.4%, 23.3%, 37.7% |
| Duration | 89, 144, 233, 377, 610, 987 ms |
| Z-index | 8, 13, 21, 34, 55, 89, 144 |
| Gradients | midpoint at 61.8% (1/φ, not 50%) |

## CSS Variables

All theme values are available as CSS custom properties:

```css
background: var(--aether-l0);  /* The Void — #0a0a0f */
background: var(--aether-l3);  /* The Surface — containers */
color: var(--aether-text-primary);   /* 98% lightness */
color: var(--aether-text-secondary); /* 65% lightness */
color: var(--aether-text-ghost);     /* 30% lightness */
border: 1px solid var(--aether-border-subtle);
box-shadow: var(--aether-shadow-lg);
backdrop-filter: blur(var(--aether-blur-lg));
```

## Material Design 3 Integration

```tsx
import { M3_COLOR_ROLES, M3_ELEVATION_MAP, M3_STATE_MAP } from '@/styles/aether-design-system'

// M3 surface levels → Aether layers
// neutral4  → L0 (surface-lowest)
// neutral6  → L1 (background)
// neutral12 → L3 (surface-container)
// neutral90 → text-primary (on-surface)

// M3 state overlays → Fibonacci opacity
// hover   → 0.055 (F(10)/1000)
// focus   → 0.089 (F(11)/1000)
// pressed → 0.089 (F(11)/1000)
// dragged → 0.144 (F(12)/1000)
```

## Design System Checklist

```tsx
import { DesignSystemChecklist } from '@/components/aether'

const [showChecklist, setShowChecklist] = useState(false)

<DesignSystemChecklist isOpen={showChecklist} onClose={() => setShowChecklist(false)} />
```

Shows the full audit: layers, gradients, animations, component inventory.

## Utility Classes (from aether-theme.css)

```html
<div class="aether-glass">Frosted glass panel</div>
<div class="aether-glass-sm">Light glass</div>
<div class="aether-gradient-text">Gradient text</div>
<div class="aether-layer-0">Void background</div>
<div class="aether-layer-3">Surface background</div>
<div class="aether-anim-fade-in">Fade in animation</div>
<div class="aether-anim-pulse">Pulse animation</div>
<div class="aether-text-high">87% emphasis text</div>
<div class="aether-text-medium">60% emphasis text</div>
<div class="aether-text-disabled">38% emphasis text</div>
<div class="aether-surface-lowest">M3 surface-lowest</div>
<div class="aether-elevation-3">M3 elevation level 3 shadow</div>
```
