/* 
  Menu Toggle Functionality
  This file contains code related to the menu toggle functionality.
*/

/**
 * Applies fade-in animation to an element that initially has the "display: none" property.
 *
 * @param {HTMLElement} targetElement - The element to be displayed.
 * @param {string} [displayProperty="block"] - The display property value to set after fading in the element. Default: "block".
 */
function fadeInElement(targetElement, displayProperty = "block") {
    targetElement.parentNode.style.removeProperty("display");
    targetElement.parentNode.style.display = displayProperty;
    targetElement.classList.add("opening");
  
    targetElement.addEventListener("animationend", () => {
      targetElement.classList.remove("opening");
    }, { once: true });
  }
  
  /**
   * Sets the display property to "none" after an animation.
   * @param {HTMLElement} targetElement - The element to be hidden.
   */
  function fadeOutElement(targetElement) {
    targetElement.classList.add("closing");
  
    targetElement.addEventListener("animationend", () => {
      targetElement.parentNode.style.display = "none";
      targetElement.classList.remove("closing");
    }, { once: true });
  }
  
  const Menu = {
    // Menu variables
    hamburgerButton: document.querySelector(".btn-hamburger-menu"),
    isMenuVisible: false,
    isAnimationInProgress: false,
  
    /**
     * Creates arrays from initially displayed/hidden elements and their default display property values.
     */
    initializeElements: () => {
      Menu.hiddenElements = Array.from(document.querySelectorAll('[data-displayed="false"]')).map(element => ({
        node: element,
        displayPropertyValue: getComputedStyle(element).display
      }));
  
      Menu.displayedElements = Array.from(document.querySelectorAll('[data-displayed="true"]')).map(element => ({
        node: element,
        displayPropertyValue: getComputedStyle(element).display
      }));
    },
  
    /**
     * Toggles the visibility of the popup menu and update associated classes.
     */
    toggleMenu: () => {
      // Check if required elements are found
      if (!Menu.hamburgerButton || !Menu.hiddenElements || !Menu.displayedElements) {
        throw new Error('Some required elements are missing.');
      }

      if (Menu.isAnimationInProgress) {
        // Animation is in progress, return early to prevent toggle action
        return;
      }
  
      Menu.hamburgerButton.classList.toggle("change");
  
      if (!Menu.isMenuVisible) {
        Menu.isAnimationInProgress = true;

        Menu.displayedElements.forEach(element => {
          fadeOutElement(element.node);
        });
  
        Menu.hiddenElements.forEach(element => {
          // Set the display property of the parent to the initial display property of the target element.
          fadeInElement(element.node, element.displayPropertyValue); 
        });

          // Update isMenuVisible flag after the animation ends
        setTimeout(() => {
          Menu.isAnimationInProgress = false;
          Menu.isMenuVisible = true;
        }, 450); 

      } else if (Menu.isMenuVisible) {
        Menu.isAnimationInProgress = true;

        Menu.hiddenElements.forEach(element => {
          fadeOutElement(element.node);
        });
  
        Menu.displayedElements.forEach(element => {
          fadeInElement(element.node, element.displayPropertyValue);
        });
        
        setTimeout(() => {
          Menu.isAnimationInProgress = false;
          Menu.isMenuVisible = false;
        }, 450); 
      }
    },
  };
  
  // Initialize elements
  Menu.initializeElements();
  
  // Event listener for menu toggle
  Menu.hamburgerButton.addEventListener("click", Menu.toggleMenu);

  backdrop = document.querySelector(".menu-backdrop");
  backdrop.addEventListener("click", Menu.toggleMenu);
  