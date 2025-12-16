import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates a Bento Grid block (container for Bento Card blocks)
 *
 * The Bento Grid creates a CSS Grid layout with configurable column counts.
 * Grid columns are controlled by block variants:
 * - No variant or "cols-4": 4 columns (default)
 * - "cols-3": 3 columns
 * - "cols-6": 6 columns
 *
 * Each child row should be a Bento Card with width configuration (small/medium/large/full).
 * The grid applies appropriate column spans based on each card's width setting.
 *
 * @param {HTMLElement} block The bento-grid block element
 */
export default function decorate(block) {
  // Determine grid column count from variant class
  let gridCols = 4; // default
  if (block.classList.contains('cols-3')) {
    gridCols = 3;
  } else if (block.classList.contains('cols-6')) {
    gridCols = 6;
  }

  // Store grid columns as data attribute for CSS to use
  block.setAttribute('data-grid-cols', gridCols);

  // Create grid container
  const grid = document.createElement('div');
  grid.className = 'bento-grid-container';

  // Process each row as a Bento Card
  [...block.children].forEach((row) => {
    const card = document.createElement('div');
    card.className = 'bento-grid-item';

    // Read width configuration from the third div (index 2)
    const widthDiv = row.children[2];
    const widthParagraph = widthDiv?.querySelector('p');
    const cardWidth = widthParagraph?.textContent?.trim() || 'medium';

    // Apply width as data attribute for CSS grid span
    card.setAttribute('data-width', cardWidth);

    // Read CTA style from the fourth div (index 3)
    const ctaDiv = row.children[3];
    const ctaParagraph = ctaDiv?.querySelector('p');
    const ctaStyle = ctaParagraph?.textContent?.trim() || 'button';

    moveInstrumentation(row, card);

    // Move all cells into the card
    while (row.firstElementChild) card.append(row.firstElementChild);

    // Process the card children to identify and style them correctly
    [...card.children].forEach((div, index) => {
      // First div (index 0) - Image
      if (index === 0) {
        div.className = 'bento-grid-card-image';
      } else if (index === 1) {
        // Second div (index 1) - Content with button
        div.className = 'bento-grid-card-body';
      } else if (index === 2) {
        // Third div (index 2) - Width configuration
        div.className = 'bento-grid-config';
        const p = div.querySelector('p');
        if (p) {
          p.style.display = 'none'; // Hide the configuration text
        }
      } else if (index === 3) {
        // Fourth div (index 3) - CTA style configuration
        div.className = 'bento-grid-config';
        const p = div.querySelector('p');
        if (p) {
          p.style.display = 'none'; // Hide the configuration text
        }
      }
    });

    // Apply CTA styles to button containers
    const buttonContainers = card.querySelectorAll('p.button-container');
    buttonContainers.forEach((buttonContainer) => {
      // Remove any existing CTA classes
      buttonContainer.classList.remove('button', 'button-secondary', 'button-dark');
      // Add the correct CTA class
      buttonContainer.classList.add(ctaStyle);
    });

    grid.append(card);
  });

  // Optimize images
  grid.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(grid);
}
