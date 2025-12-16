# Bento Grid Block

A flexible grid container block that creates responsive, customizable layouts similar to [Tailwind's Bento Grid patterns](https://tailwindcss.com/plus/ui-blocks/marketing/sections/bento-grids).

## Overview

The Bento Grid block acts as a container that holds Bento Card child blocks. It provides a CSS Grid-based layout with configurable column counts, allowing cards to span different widths for varied, asymmetric layouts.

## Usage

### Basic Structure

```
| Bento Grid |
|------------|
| [Bento Card content row 1] |
| [Bento Card content row 2] |
| [Bento Card content row 3] |
```

Each row in the Bento Grid table should contain a Bento Card block.

### Grid Column Variants

Control the number of grid columns using block variants:

- **Default** (`Bento Grid`): 4 columns
- **3 Columns** (`Bento Grid (cols-3)`): 3 columns
- **4 Columns** (`Bento Grid (cols-4)`): 4 columns (explicit)
- **6 Columns** (`Bento Grid (cols-6)`): 6 columns

### Card Width Configuration

Each Bento Card specifies its width span:
- `small`: 1 column
- `medium`: 2 columns
- `large`: 3 columns
- `full`: Spans all columns in the grid

## Responsive Behavior

- **Desktop (>1024px)**: Full grid layout with configured columns
- **Tablet (768px-1024px)**: 2-column layout
  - Small/medium cards: 1 column
  - Large/full cards: 2 columns
- **Mobile (<768px)**: Single column (stacked vertically)

## Examples

### 4-Column Grid with Mixed Widths

```
| Bento Grid |
|------------|
| [Image] | [Content] | large | button |
| [Image] | [Content] | small | button |
| [Image] | [Content] | medium | button-secondary |
| [Image] | [Content] | full | button-dark |
```

### 3-Column Grid

```
| Bento Grid (cols-3) |
|---------------------|
| [Image] | [Content] | large | button |
| [Image] | [Content] | small | button |
| [Image] | [Content] | medium | button-secondary |
```

## Technical Details

- **Block Type**: Collection (Container)
- **Children**: Bento Card blocks
- **Layout**: CSS Grid with configurable columns
- **Styling**: Matches Cards block visual language

## Test Content

Local test content is available at: `drafts/bento-grid-test.html`

To view locally, run:
```bash
aem up --html-folder drafts
```

Then visit: `http://localhost:3000/drafts/bento-grid-test`

