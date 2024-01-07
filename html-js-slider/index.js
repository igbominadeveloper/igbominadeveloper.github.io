const slides = document.querySelectorAll('.slide');
const orientationButtons = document.querySelectorAll('.orientation button');
const sliderContainer = document.querySelector('.slider-container');
const colorModeButton = document.querySelector('.theme-toggle button');
const lightTheme = document.querySelector('.theme-toggle button .sun');
const darkTheme = document.querySelector('.theme-toggle button .moon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const sliderControlButtons = document.querySelectorAll(
  '.slider-control button'
);

if (prefersDarkScheme) {
  document.body.classList.toggle('dark-mode');
}

if (document.body.classList.contains('dark-mode')) {
  darkTheme.style.display = 'none';
  lightTheme.style.display = 'block';
}

/**
 * expand a slider
 * @param {MouseEvent} event
 */
const expandItem = (event) => {
  resetFlexBasis(event.currentTarget);

  const element = event.currentTarget;
  element.classList.toggle('expanded');
};

/**
 * reset the flex basis for all the items except the current element
 * @param {Element} currentTarget
 */
const resetFlexBasis = (currentTarget) => {
  const allSlides = Array.from(slides);

  allSlides
    .filter((slide) => slide.id !== currentTarget.id)
    .forEach((slide) => slide.classList.remove('expanded'));
};

/**
 * toggle the slider orientation between landscape and portrait
 * @param {MouseEvent} event
 */
const toggleOrientation = (event) => {
  const orientation = event.currentTarget.textContent;
  console.log(orientation);

  if (orientation === 'portrait') {
    sliderContainer.style.transform = 'rotate(90deg)';
  } else {
    sliderContainer.style.transform = 'rotate(0deg)';
  }
};

/**
 * toggle the theme between dark and light mode
 */
const toggleTheme = () => {
  const darkMode = !!document.body.classList.contains('dark-mode');

  if (prefersDarkScheme.matches) {
    if (darkMode) {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      darkTheme.style.display = 'block';
      lightTheme.style.display = 'none';
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');

      darkTheme.style.display = 'none';
      lightTheme.style.display = 'block';
    }
  }
};

/**
 * cycle through slides to expand them
 */
const cycleThroughSlides = (event) => {
  const buttonType = event.currentTarget.className; // left or right
  // get all the slides
  // find the one with expanded - remove the class and apply to the next one
  // if none, just default to the first one
  const allSlides = Array.from(slides);
  const currentExpandedSlideIndex =
    allSlides.findIndex((slide) => slide.classList.contains('expanded')) ?? 0;

  let nextElement;
  if (buttonType === 'right') {
    if (currentExpandedSlideIndex === allSlides.length - 1) return;
    nextElement = allSlides[currentExpandedSlideIndex + 1];
  } else {
    if (currentExpandedSlideIndex === 0) return;
    nextElement = allSlides[currentExpandedSlideIndex - 1];
  }

  console.log(nextElement, '>>>>>');

  expandItem({ currentTarget: nextElement });
};

// register event listeners
slides.forEach((slide) => {
  slide.addEventListener('click', expandItem);
});

orientationButtons.forEach((button) =>
  button.addEventListener('click', toggleOrientation)
);

colorModeButton.addEventListener('click', toggleTheme);

sliderControlButtons.forEach((sliderControlButton) =>
  sliderControlButton.addEventListener('click', cycleThroughSlides)
);
