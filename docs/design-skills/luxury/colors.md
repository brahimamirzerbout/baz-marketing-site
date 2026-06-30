# Color Tokens


## Background Tokens

### Neutral
| Token | Light | Dark |
|---|---|---|
| neutral-primary-soft | #FFFFFF | #0C0C0C |
| neutral-primary | #FFFFFF | #060606 |
| neutral-primary-medium | #FAFAFA | #141414 |
| neutral-primary-strong | #F2F2F2 | #1E1E1E |
| neutral-secondary-soft | #FAFAFA | #0C0C0C |
| neutral-secondary | #F5F5F5 | #060606 |
| neutral-secondary-medium | #F0F0F0 | #141414 |
| neutral-secondary-strong | #E8E8E8 | #1E1E1E |
| neutral-tertiary-soft | #E0E0E0 | #141414 |
| neutral-tertiary | #E0E0E0 | #1C1C1C |
| neutral-tertiary-medium | #D0D0D0 | #262626 |
| neutral-quaternary | #C0C0C0 | #262626 |
| quaternary-medium | #B0B0B0 | #333333 |
| gray | #999999 | #444444 |

### Brand
| Token | Light | Dark |
|---|---|---|
| brand-softer | #F5F5F5 | #1A1A1A |
| brand-soft | #E0E0E0 | #333333 |
| brand | #1A1A1A | #E5E5E5 |
| brand-medium | #C0C0C0 | #333333 |
| brand-strong | #000000 | #FFFFFF |

### Status
| Token | Light | Dark |
|---|---|---|
| success-soft | #F0FDF4 | #002A1F |
| success | #16A34A | #22C55E |
| success-medium | #DCFCE7 | #004D38 |
| success-strong | #15803D | #16A34A |
| danger-soft | #FEF2F2 | #450A0A |
| danger | #DC2626 | #EF4444 |
| danger-medium | #FEE2E2 | #7F1D1D |
| danger-strong | #B91C1C | #DC2626 |
| warning-soft | #FFFBEB | #713F12 |
| warning | #F59E0B | #F59E0B |
| warning-medium | #FEF3C7 | #713F12 |
| warning-strong | #B45309 | #D97706 |

### Button Glint (CSS custom properties, used for the glint box-shadow effect)
| Variable | Light | Dark |
|---|---|---|
| `--color-1-400` | rgba(255,255,255,0.10) | rgba(255,255,255,0.05) |
| `--color-1-700` | rgba(0,0,0,0.04) | rgba(0,0,0,0.10) |

### Utility
| Token | Light | Dark |
|---|---|---|
| dark | #111111 | #111111 |
| dark-strong | #0A0A0A | #1E1E1E |
| disabled | #E0E0E0 | #1C1C1C |

### Accent
| Token | Value (same both modes) |
|---|---|
| purple | #7C3AED |
| sky | #0284C7 |
| teal | #0F766E |
| pink | #BE185D |
| cyan | #0891B2 |
| fuchsia | #A21CAF |
| indigo | #4338CA |
| orange | #1A1A1A |

## Text Color Tokens

### Base
| Token | Light | Dark |
|---|---|---|
| white | #FFFFFF | #FFFFFF |
| black | #0A0A0A | #0A0A0A |
| heading | #0A0A0A | #F5F5F5 |
| body | #555555 | #999999 |
| body-subtle | #888888 | #666666 |

### Brand
| Token | Light | Dark |
|---|---|---|
| fg-brand-subtle | #C0C0C0 | #333333 |
| fg-brand | #1A1A1A | #E5E5E5 |
| fg-brand-strong | #000000 | #FFFFFF |

### Status
| Token | Light | Dark |
|---|---|---|
| fg-success | #16A34A | #15803D |
| fg-success-strong | #15803D | #22C55E |
| fg-danger | #DC2626 | #EF4444 |
| fg-danger-strong | #991B1B | #F87171 |
| fg-warning-subtle | #D97706 | #F59E0B |
| fg-warning | #92400E | #FBBF24 |
| fg-disabled | #999999 | #555555 |

### Informational / Accent
| Token | Light | Dark |
|---|---|---|
| fg-yellow | #EAB308 | #EAB308 |
| fg-info | #1E1B4B | #93C5FD |
| fg-purple | #7C3AED | #A78BFA |
| fg-purple-strong | #6D28D9 | #DDD6FE |
| fg-cyan | #0891B2 | #06B6D4 |
| fg-indigo | #4338CA | #6366F1 |
| fg-pink | #BE185D | #EC4899 |
| fg-lime | #65A30D | #84CC16 |

## Border Color Tokens

| Token | Light | Dark |
|---|---|---|
| border-dark | #1A1A1A | #555555 |
| border-buffer | #FFFFFF | #060606 |
| border-buffer-medium | #FFFFFF | #141414 |
| border-buffer-strong | #FFFFFF | #1E1E1E |
| border-muted | #FAFAFA | #0C0C0C |
| border-light-subtle | #E8E8E8 | #0C0C0C |
| border-light | #E5E5E5 | #141414 |
| border-light-medium | #D5D5D5 | #1E1E1E |
| border-default-subtle | #D5D5D5 | #0C0C0C |
| border-default | #D0D0D0 | #1C1C1C |
| border-default-medium | #C0C0C0 | #262626 |
| border-default-strong | #999999 | #333333 |
| border-success-subtle | #BBF7D0 | #064E3B |
| border-success | #16A34A | #15803D |
| border-danger-subtle | #FECDD3 | #991B1B |
| border-danger | #DC2626 | #DC2626 |
| border-warning-subtle | #FED7AA | #92400E |
| border-warning | #D97706 | #F59E0B |
| border-brand-subtle | #E0E0E0 | #333333 |
| border-brand-light | #555555 | #AAAAAA |
| border-brand | #1A1A1A | #E5E5E5 |
| border-dark-subtle | #1A1A1A | #262626 |
| border-purple | #7C3AED | #A78BFA |
| border-orange | #1A1A1A | #E5E5E5 |

## Semantic Usage Rules

- Page/section backgrounds: neutral-primary-soft (pure white), neutral-secondary-soft (off-white #FAFAFA), neutral-tertiary-soft (light gray #E0E0E0 for alternating)
- Dark sections (footer, hero overlays): dark (#111111)
- Primary buttons: brand background
- Headings: heading text color
- Body text: body text color
- CTA links: fg-brand text color
- Default borders: border-default
- Status borders match intent: success → border-success, danger → border-danger, warning → border-warning
- Disabled: disabled background + fg-disabled text

## Prohibited

- No raw hex/rgb values in component code — always use design tokens
- No brand text color for long-form paragraphs
- No accent text tokens (fg-purple, etc.) for body copy or navigation
- No brand/accent backgrounds for large layout surfaces (pages, sections) unless it's a hero/campaign area
- No manual light/dark value swapping — let the CSS custom properties handle it
