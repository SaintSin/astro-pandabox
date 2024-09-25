// Using astro:page-load listener to handle ViewTransitions, otherwise use DOMContentLoaded
document.addEventListener("astro:page-load", () => {
  const thumbnailButtons = document.querySelectorAll<HTMLButtonElement>(
    ".thumbnail-button img"
  );
  const lightboxDialog =
    document.querySelector<HTMLDialogElement>(".lightbox-dialog");
  const prevButton = document.querySelector<HTMLButtonElement>(".prev-button");
  const nextButton = document.querySelector<HTMLButtonElement>(".next-button");
  const closeButton =
    document.querySelector<HTMLButtonElement>(".close-button");

  const debug = false; // Enable debug logging

  let currentIndex = 0;

  function logDebugInfo(
    action: string,
    rect?: DOMRect,
    image?: HTMLImageElement
  ) {
    if (debug) {
      console.log("Transition ", lightboxDialog?.getAttribute("data-option"));

      console.log(`Debug Info (${action}):`);
      if (rect) {
        console.log(
          `Thumbnail Position: X=${rect.left}, Y=${rect.top}, Width=${rect.width}, Height=${rect.height}`
        );
      }
      if (image) {
        const imgRect = image.getBoundingClientRect();
        console.log(
          `Target Image Position: X=${imgRect.left}, Y=${imgRect.top}, Width=${imgRect.width}, Height=${imgRect.height}`
        );
      }
    }
  }

  function calculateCentering(image: HTMLImageElement) {
    const wrapper = image.closest(".lightbox-image-wrapper") as HTMLElement;

    if (!wrapper) {
      console.error("Image wrapper not found.");
      return;
    }

    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperWidth = wrapperRect.width;
    const wrapperHeight = wrapperRect.height;

    if (!wrapperWidth || !wrapperHeight) {
      // console.error("Image wrapper dimensions are invalid.");
      return;
    }

    const imageWidth = Number.parseFloat(image.getAttribute("width") || "0");
    const imageHeight = Number.parseFloat(image.getAttribute("height") || "0");

    if (!imageWidth || !imageHeight) {
      console.error("Image dimensions are invalid.");
      return;
    }

    const imageAspectRatio = imageWidth / imageHeight;
    const wrapperAspectRatio = wrapperWidth / wrapperHeight;
    // console.log("Aspect ratio image: ", imageAspectRatio);
    // console.log("Wrapper w x h: ", wrapperWidth, wrapperHeight);
    // console.log("Aspect ratio Wrapper: ", wrapperAspectRatio);
    // console.log("image w h: ", imageWidth, imageHeight);

    let finalX = 0;
    let finalY = 0;

    if (wrapperAspectRatio > imageAspectRatio) {
      // The image is taller than the wrapper
      const targetHeight = wrapperHeight;
      const targetWidth = targetHeight * imageAspectRatio;
      finalX = (wrapperWidth - targetWidth) / 2; // Center horizontally
    } else {
      // The wrapper is taller than the image
      const targetWidth = wrapperWidth;
      const targetHeight = targetWidth / imageAspectRatio;
      finalY = (wrapperHeight - targetHeight) / 2; // Center vertically
    }

    // Ensure we don't have negative values
    finalX = Math.max(0, finalX);
    finalY = Math.max(0, finalY);

    // Apply final positions to the image
    image.style.setProperty("--final-x", `${finalX}px`);
    image.style.setProperty("--final-y", `${finalY}px`);
    image.style.setProperty("--final-scale", `1`);

    // console.log(`Final X: ${finalX}px, Final Y: ${finalY}px`); // For debugging
  }

  function showImageAtIndex(index: number) {
    const lightboxImageContainers = document.querySelectorAll<HTMLElement>(
      ".lightbox-image-container"
    );

    if (index < 0 || index >= lightboxImageContainers.length) return;

    for (const container of lightboxImageContainers) {
      container.classList.remove("active");
      container.classList.remove("previous");
      container.classList.remove("next");
    }

    const newActiveImage = document.getElementById(`image-${index}`);
    if (newActiveImage) {
      newActiveImage.classList.add("active");
      currentIndex = index; // Update current index

      const image =
        newActiveImage.querySelector<HTMLImageElement>(".lightbox-image");
      if (image) {
        logDebugInfo("Image Loaded", undefined, image);
        calculateCentering(image);
      }

      // Determine previous and next indices
      const prevIndex =
        (currentIndex - 1 + lightboxImageContainers.length) %
        lightboxImageContainers.length;
      const nextIndex = (currentIndex + 1) % lightboxImageContainers.length;

      // Apply previous and next classes
      const prevImage = document.getElementById(`image-${prevIndex}`);
      const nextImage = document.getElementById(`image-${nextIndex}`);

      if (prevImage) {
        prevImage.classList.add("previous");
      }
      if (nextImage) {
        nextImage.classList.add("next");
      }
    } else {
      console.error(`Image container with id image-${index} not found.`);
    }
  }

  function openLightbox(button: HTMLButtonElement) {
    if (!lightboxDialog) return;

    const rect = button.getBoundingClientRect();
    const indexStr = button.dataset.index;
    const index = indexStr !== undefined ? Number.parseInt(indexStr, 10) : 0;

    const activeImage = document.getElementById(`image-${index}`);

    if (activeImage) {
      activeImage.classList.add("active"); // Apply active class here
      lightboxDialog.showModal(); // Then open the dialog
      currentIndex = index;

      // Use requestAnimationFrame to ensure layout is updated before calculating dimensions
      requestAnimationFrame(() => {
        const lightboxWrapper = activeImage.querySelector<HTMLDivElement>(
          ".lightbox-image-wrapper"
        );

        if (lightboxWrapper) {
          const wrapperRect = lightboxWrapper.getBoundingClientRect();

          if (wrapperRect.width === 0 || wrapperRect.height === 0) {
            console.error("Lightbox image wrapper has zero dimensions.");
            return;
          }

          const lightboxImage =
            activeImage.querySelector<HTMLImageElement>(".lightbox-image");

          if (lightboxImage) {
            const buttonAspectRatio = rect.width / rect.height;
            const wrapperAspectRatio = wrapperRect.width / wrapperRect.height;

            // Calculate --initial-scale based on aspect ratios
            let initialScale: number;
            if (buttonAspectRatio > wrapperAspectRatio) {
              initialScale = rect.width / wrapperRect.width;
            } else {
              initialScale = rect.height / wrapperRect.height;
            }

            // Apply calculated CSS custom properties to the image for animation/transition
            lightboxImage.style.setProperty("--initial-x", `${rect.left}px`);
            lightboxImage.style.setProperty("--initial-y", `${rect.top}px`);
            lightboxImage.style.setProperty(
              "--initial-scale",
              `${initialScale}`
            );

            logDebugInfo("Thumbnail Clicked", rect);

            // If the transition is "slide", remove the zoom effect
            const transitionType = lightboxDialog.getAttribute("data-option");
            if (transitionType !== "slide") {
              calculateCentering(lightboxImage); // For zoom-in effect
            }
          }

          // Apply classes for previous and next images when opening the dialog
          showImageAtIndex(currentIndex);
        } else {
          console.error("Lightbox wrapper not found.");
        }
      });
    }
  }

  function showPreviousImage() {
    const prevIndex =
      (currentIndex - 1 + thumbnailButtons.length) % thumbnailButtons.length;
    showImageAtIndex(prevIndex);
  }

  function showNextImage() {
    const nextIndex = (currentIndex + 1) % thumbnailButtons.length;
    showImageAtIndex(nextIndex);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!lightboxDialog || !lightboxDialog.open) return;

    switch (event.key) {
      case "ArrowLeft":
        showPreviousImage();
        break;
      case "ArrowRight":
        showNextImage();
        break;
      case "Escape":
        if (lightboxDialog) {
          lightboxDialog.close();
        }
        break;
    }
  }

  if (lightboxDialog) {
    lightboxDialog.addEventListener("close", () => {
      const lightboxImageContainers = document.querySelectorAll<HTMLElement>(
        ".lightbox-image-container"
      );
      for (const container of lightboxImageContainers) {
        container.classList.remove("active");
        container.classList.remove("previous");
        container.classList.remove("next");
      }
    });
  }

  for (const button of thumbnailButtons) {
    button.addEventListener("click", () => openLightbox(button));
  }

  if (prevButton) {
    prevButton.addEventListener("click", showPreviousImage);
  }

  if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      if (lightboxDialog) {
        lightboxDialog.close();
      }
    });
  }

  document.addEventListener("keydown", handleKeydown);

  function applyCenteringToAllImages() {
    const lightboxImages =
      document.querySelectorAll<HTMLImageElement>(".lightbox-image");
    lightboxImages.forEach(calculateCentering);
  }

  // Swipe navigation
  function handleSwipe(event: TouchEvent) {
    const touchStartX = event.touches[0].clientX;

    function handleTouchEnd(event: TouchEvent) {
      const touchEndX = event.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX;

      if (distance > 50) {
        showPreviousImage(); // Swipe right
      } else if (distance < -50) {
        showNextImage(); // Swipe left
      }

      // Remove event listeners after the touch end
      document.removeEventListener("touchend", handleTouchEnd);
    }

    document.addEventListener("touchend", handleTouchEnd, { once: true });
  }

  // Attach swipe listener to the lightbox dialog
  if (lightboxDialog) {
    lightboxDialog.addEventListener("touchstart", handleSwipe, {
      passive: true,
    });
  }

  applyCenteringToAllImages();

  // Debounce function to limit the rate at which a function is called
  const debounce = (func: () => void, wait: number) => {
    let timeout: number | undefined;

    return () => {
      const later = () => {
        clearTimeout(timeout);
        func(); // No need to pass args, since the function takes no parameters
      };

      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  };

  // Apply centering to all images with debounce on window resize
  const applyCenteringDebounced = debounce(applyCenteringToAllImages, 200);

  // Attach debounced resize event listener
  window.addEventListener("resize", applyCenteringDebounced);
});
