// ═══════════════════════════════════════════════════════════════════
// AETHER COMPONENTS — Barrel exports for all new components
// ═══════════════════════════════════════════════════════════════════

// Primitives
export { Tooltip } from '../primitives/Tooltip';
export { ContextMenu } from '../primitives/ContextMenu';
export type { ContextMenuItem } from '../primitives/ContextMenu';
export { Toast, ToastContainer } from '../primitives/Toast';
export type { ToastData, ToastType } from '../primitives/Toast';
export { Modal } from '../primitives/Modal';
export { Spinner, ProgressBar, Badge, Divider, Avatar, ConfirmDialog } from '../primitives/index';

// Structure
export { ActivityBar } from '../structure/ActivityBar';
export type { ActivityItem } from '../structure/ActivityBar';
export { Resizer, StatusBar, TabBar, Terminal } from '../structure/index';

// Panels
export {
  FunctionalColorsToggle,
  SearchPanel,
  DiagnosticsPanel,
  GitPanel,
  DebugPanel,
  PluginPanel,
  KeyboardShortcutsOverlay,
} from '../panels/index';

// Editor extensions
export {
  DiffViewer,
  CodeBlock,
  Minimap,
  MermaidRenderer,
  DatasetBrowser,
  FileUploadZone,
  NotificationCenter,
} from '../editor/index';
export type {
  DiffLine,
} from '../editor/index';

// Design system
export { DesignSystemChecklist } from '../DesignSystemChecklist';

// Design system constants
export {
  PHI,
  GOLDEN_ANGLE,
  FIBONACCI,
  SPACING,
  FONT_SIZE,
  LINE_HEIGHT,
  RADIUS,
  BLUR,
  OPACITY,
  DURATION,
  EASING,
  DARK_LAYERS,
  FUNCTIONAL_COLORS,
  GRADIENTS,
  SHADOWS,
  Z_INDEX,
  MOTION,
  LAYER_ANALYSIS,
  COMPONENT_CHECKLIST,
  MISSING_COMPONENTS,
  EXISTING_COMPONENTS,
  // Material Design 3 mappings
  M3_COLOR_MAP,
  M3_ELEVATION_MAP,
  M2_ELEVATION_OVERLAY,
  M3_SHAPE_MAP,
  M3_MOTION_MAP,
  M3_EASING_MAP,
  M3_STATE_MAP,
  M2_TEXT_EMPHASIS,
  CONTRAST_STANDARDS,
  M3_COLOR_ROLES,
  M3_COMPONENT_TOKENS,
  DARK_THEME_PRINCIPLES,
  FULL_LAYER_ANALYSIS,
} from '../../styles/aether-design-system';