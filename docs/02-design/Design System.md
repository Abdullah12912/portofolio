# Design System

Sistem desain ini mendefinisikan identitas visual, token warna, tipografi, dan prinsip tata letak (*layout*) untuk **Personal Portfolio Website & Admin Dashboard**. Implementasi dilakukan menggunakan **Vanilla CSS Custom Properties (Variables)** agar memiliki fleksibilitas tinggi dan performa optimal.

---

## 1. Color Palette (Harmonious Dark Theme First)

Website ini menggunakan pendekatan **Dark Mode** sebagai bawaan utama (*default*), dengan palet warna HSL yang dikurasi secara harmonis untuk memberikan kesan premium, bersih, dan modern.

```css
:root {
  /* Brand/Accent Colors */
  --color-primary-hue: 220; /* Deep blue-gray tone */
  --color-primary-sat: 90%;
  
  --color-primary: hsl(var(--color-primary-hue), var(--color-primary-sat), 55%);
  --color-primary-hover: hsl(var(--color-primary-hue), var(--color-primary-sat), 45%);
  --color-primary-glow: hsla(var(--color-primary-hue), var(--color-primary-sat), 55%, 0.15);
  
  /* Neutral Dark Theme Scale */
  --color-bg: hsl(220, 20%, 6%);             /* Dark charcoal grey */
  --color-surface: hsl(220, 18%, 10%);       /* Card background */
  --color-surface-elevated: rgb(24, 28, 37); /* Hovered surface */
  --color-border: hsl(220, 12%, 18%);        /* Standard border */
  
  /* Text Scale */
  --color-text-primary: hsl(220, 20%, 95%);  /* Off-white */
  --color-text-secondary: hsl(220, 12%, 65%);/* Muted grey */
  --color-text-muted: hsl(220, 10%, 45%);    /* Disabled/meta text */
  
  /* System Feedback Colors */
  --color-success: hsl(140, 70%, 45%);
  --color-warning: hsl(40, 85%, 50%);
  --color-danger: hsl(0, 80%, 55%);
  
  /* Glassmorphism token */
  --glass-bg: rgba(15, 18, 25, 0.7);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-blur: blur(12px);
}
```

---

## 2. Typography

Menggunakan Google Fonts **Outfit** untuk heading (modern, minimalis) dan **Inter** untuk body text (keterbacaan tinggi).

* **Heading Font Family**: `'Outfit', sans-serif;`
* **Body Font Family**: `'Inter', sans-serif;`

### Font Size & Weight Scale

| Token | Size (rem) | Size (px) | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--fs-xs` | `0.75rem` | 12px | 400 | 1.4 | Meta tags, timestamps |
| `--fs-sm` | `0.875rem` | 14px | 400 / 500 | 1.5 | Subtitles, button text, side notes |
| `--fs-base` | `1.0rem` | 16px | 400 | 1.6 | Body text, paragraph |
| `--fs-lg` | `1.25rem` | 20px | 500 / 600 | 1.5 | Small headings, card titles |
| `--fs-xl` | `1.5rem` | 24px | 600 | 1.4 | Section titles |
| `--fs-2xl` | `2.25rem` | 36px | 700 | 1.3 | Page headers |
| `--fs-3xl` | `3.5rem` | 56px | 800 | 1.1 | Hero titles |

---

## 3. Spacing System

Sistem spasi modular berbasis kelipatan 4px / 8px untuk memastikan konsistensi *whitespace*.

```css
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem;  /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1.0rem;  /* 16px */
  --space-6: 1.5rem;  /* 24px */
  --space-8: 2.0rem;  /* 32px */
  --space-12: 3.0rem; /* 48px */
  --space-16: 4.0rem; /* 64px */
  --space-24: 6.0rem; /* 96px */
}
```

---

## 4. Layout & Grid

* **Max Width Container**: `1200px` (untuk menjaga kerapian pembacaan di monitor lebar).
* **Sidebar Width (Admin)**: `260px` desktop / collapsible di mobile.
* **Aspect Ratios**:
  * Proyek / Foto Landscape: `16:9` atau `3:2`
  * Foto Portrait: `4:5` atau `2:3`

---

## 5. Shadows & Borders

```css
:root {
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.25);
  
  /* Focus Outline (Accesibility) */
  --focus-ring: 2px solid var(--color-primary);
  --focus-ring-offset: 2px;
}
```

---

## 6. Motion & Micro-animations

Semua interaksi transisi menggunakan durasi dan kurva *timing* yang konsisten agar terasa premium dan responsif.

* **Transition Duration**:
  * Fast (Hover state, micro-interaction): `150ms`
  * Medium (Modal, dropdown, slide-in): `300ms`
  * Slow (Page transitions): `500ms`
* **Timing Function**: `cubic-bezier(0.4, 0, 0.2, 1)` (standard ease-in-out).

```css
.interactive-element {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.interactive-element:hover {
  transform: translateY(-2px);
  color: var(--color-primary);
}
```
