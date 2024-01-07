const slides = document.querySelectorAll('.slide');
const orientationButtons = document.querySelectorAll('.orientation button');
const slider = document.querySelector('.slider');
const colorModeButton = document.querySelector('.theme-toggle button');
const lightTheme = document.querySelector('.theme-toggle button .sun');
const darkTheme = document.querySelector('.theme-toggle button .moon');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme) {
  document.body.classList.toggle('dark-mode');
}

if (document.body.classList.contains('dark-mode')) {
  darkTheme.style.display = 'none';
  lightTheme.style.display = 'block';
}

const expandItem = (event) => {
  resetFlexBasis(event.currentTarget);

  const element = event.currentTarget;
  element.classList.toggle('expanded');
};

const resetFlexBasis = (currentTarget) => {
  const allSlides = Array.from(slides);

  allSlides
    .filter((slide) => slide.id !== currentTarget.id)
    .forEach((slide) => slide.classList.remove('expanded'));
};

const changeOrientation = (event) => {
  const orientation = event.currentTarget.textContent;
  console.log(orientation);

  if (orientation === 'portrait') {
    slider.style.transform = 'rotate(90deg)';
  } else {
    slider.style.transform = 'rotate(0deg)';
  }
};

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

// register event listeners
slides.forEach((slide) => {
  slide.addEventListener('click', expandItem);
});

orientationButtons.forEach((button) =>
  button.addEventListener('click', changeOrientation)
);

colorModeButton.addEventListener('click', toggleTheme);
