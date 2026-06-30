# Typography

> Dependencies: `colors.md`

## Core Rules

- **Font:** "IBM Plex Mono", monospace — configured at app level, never override
- **Headings:** bold weight (700), heading text color, mixed case (sentence or title case) for all heading levels
- **Body copy:** body text color, never use brand color for paragraphs longer than one sentence
- **Semantic HTML:** Use `h1`–`h6` in order, never skip levels

## Heading Scale

### Desktop

| Element | Size | Line-height | Letter-spacing | Margin-bottom |
|---|---|---|---|---|
| `h1` | 140px | 0.95 | -3px | 40px |
| `h2` | 140px | 1.05 | -1.5px | — |
| `h3` | 40px | 1.1 | -0.5px | — |
| `h4` | 30px | 1.2 | — | — |
| `h5` | 22px | 1.4 | — | — |
| `h6` | 18px | 1.3 | — | — |

**Important Rule for Headings:** Only main section headings (`h1`, `h2`) should be 140px. Card headings, footer headings, and other secondary headings MUST use the smaller sizes (`h3`–`h6`) and should never be 140px.

### Responsive

| Element | Tablet (≥768px) | Mobile (default) |
|---|---|---|
| `h1` | 64px | 40px |
| `h2` | 48px | 36px |
| `h3` | 32px | 26px |
| `h4` | 26px | 22px |
| `h5` | 20px | 18px |
| `h6` | 16px | 16px |

Mobile-first: start with mobile sizes, scale up at tablet and desktop breakpoints.

Never reduce line-height below 1.1 for any heading.

## Paragraphs

### Leading Paragraph
- Size: 18px
- Weight: normal
- Color: body
- Line-height: 1.7
- Max width: ~65 characters

### Normal Paragraph
- Size: 15px
- Weight: normal
- Color: body
- Line-height: 1.7
- Max width: ~60 characters

### Small Supporting Copy
- Size: 13px
- Weight: normal
- Color: body
- Line-height: 1.6
- Use only for helper text, legal text, captions, metadata.

## UI Labels

| Context | Size | Weight |
|---|---|---|
| Button labels | 15px | 500 (medium) |
| Input labels | 14px or 15px | 500 (medium) |
| Captions / meta / badges | 12px or 13px | 500 (medium) |

Do not apply paragraph line-height (1.7) to control labels.

## Links

- **Inline links:** Same size as surrounding text, fg-brand color, underline, hover → no underline
- **CTA links:** fg-brand color, medium weight, underline, hover → no underline

## Emphasis

- `<strong>` for high-priority emphasis in body text
- `<em>` for tone emphasis only, not visual hierarchy
- All-caps only for short labels: uppercase, 1.5px letter-spacing, 12px or 13px

## Dark Mode

Hierarchy stays identical. Only color tokens change (automatic via CSS custom properties). Size, weight, and spacing remain constant.
