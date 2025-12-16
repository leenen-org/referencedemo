import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates a Bento Card block
 *
 * Expected structure (4 cells per row):
 * - Cell 0: Image
 * - Cell 1: Content (heading, text, CTA)
 * - Cell 2: Width configuration (small|medium|large|full)
 * - Cell 3: CTA style configuration (button|button-secondary|button-dark)
 *
 * @param {HTMLElement} block The bento-card block element
 */
export default function decorate(block) {
  // Process each row as a card
  [...block.children].forEach((row) => {
    // Create card wrapper
    const card = document.createElement('div');
    card.className = 'bento-card-item';

    // Read width configuration from the third div (index 2)
    const widthDiv = row.children[2];
    const widthParagraph = widthDiv?.querySelector('p');
    const cardWidth = widthParagraph?.textContent?.trim() || 'medium';

    // Apply width as data attribute for parent grid to use
    card.setAttribute('data-width', cardWidth);

    // Read CTA style from the fourth div (index 3)
    const ctaDiv = row.children[3];
    const ctaParagraph = ctaDiv?.querySelector('p');
    const ctaStyle = ctaParagraph?.textContent?.trim() || 'button';

    // Move instrumentation to card wrapper
    moveInstrumentation(row, card);

    // Move all cells into the card
    while (row.firstElementChild) card.append(row.firstElementChild);

    // Process the card children to identify and style them correctly
    [...card.children].forEach((div, index) => {
      // First div (index 0) - Image
      if (index === 0) {
        div.className = 'bento-card-image';
      } else if (index === 1) {
        // Second div (index 1) - Content with button
        div.className = 'bento-card-body';
      } else if (index === 2) {
        // Third div (index 2) - Width configuration
        div.className = 'bento-card-config';
        const p = div.querySelector('p');
        if (p) {
          p.style.display = 'none'; // Hide the configuration text
        }
      } else if (index === 3) {
        // Fourth div (index 3) - CTA style configuration
        div.className = 'bento-card-config';
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

    // Replace row with card
    row.replaceWith(card);
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
