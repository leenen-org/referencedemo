# Bento Card Block

Individual card blocks designed to be used within the Bento Grid container block.

## Overview

Bento Card blocks are the child elements of Bento Grid containers. Each card supports images, rich text content, CTA buttons, and configurable width spans.

## Usage

### Structure

Each Bento Card is a single row with 4 columns:

```
| Image | Content | Width | CTA Style |
```

- **Column 1 (Image)**: Card image or visual element
- **Column 2 (Content)**: Rich text including heading, description, and CTA link
- **Column 3 (Width)**: Card width span (`small` | `medium` | `large` | `full`)
- **Column 4 (CTA Style)**: Button style (`button` | `button-secondary` | `button-dark`)

### Content Formatting

Within the Content column, use semantic formatting:
- **Heading**: Use H1, H2, H3, or bold text
- **Description**: Regular paragraph text
- **CTA**: Links are automatically converted to buttons

### Width Options

- **`small`**: Spans 1 column in the grid
- **`medium`**: Spans 2 columns in the grid (default)
- **`large`**: Spans 3 columns in the grid
- **`full`**: Spans all columns in the grid

Width spans are relative to the parent Bento Grid's column count.

### CTA Styles

- **`button`**: Primary button style (default)
- **`button-secondary`**: Secondary button style
- **`button-dark`**: Dark button style

## Examples

### Small Card (1 Column)

```
| ![Image](image.jpg) | ## Card Title<p>Short description.</p><p>[Learn More](#)</p> | small | button |
```

### Medium Card (2 Columns)

```
| ![Image](image.jpg) | ## Feature Card<p>More detailed content here.</p><p>[Explore](#)</p> | medium | button-secondary |
```

### Large Card (3 Columns)

```
| ![Image](image.jpg) | ## Major Feature<p>Extended description with more details about this important feature.</p><p>[Get Started](#)</p> | large | button-dark |
```

### Full Width Card

```
| ![Image](image.jpg) | ## Hero-Style Card<p>Maximum width for maximum impact and visibility.</p><p>[Take Action](#)</p> | full | button |
```

## Technical Details

- **Block Type**: Collection Item (used within Bento Grid)
- **Parent Block**: Bento Grid
- **Layout**: Flexbox vertical layout (image top, content below)
- **Image Optimization**: Automatic via `createOptimizedPicture()`
- **Aspect Ratio**: 16:9 on desktop, 4:3 on mobile

## Notes

- Bento Card blocks should only be used within Bento Grid containers
- Image is optional (can be empty for text-only cards)
- Width configuration is hidden from rendered output
- Hover effect: slight image scale (1.05x)

