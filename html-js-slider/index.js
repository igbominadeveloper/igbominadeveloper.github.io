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
  resetFlexBasis();

  const element = event.currentTarget;
  element.style.flexBasis = '60%';
  element.style.justifyContent = 'flex-start';
  element.style.paddingLeft = '1rem';
};

const resetFlexBasis = () => {
  slides.forEach((slide) => (slide.style.flexBasis = ''));
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
      document.body.classList.toggle('light-mode');

      darkTheme.style.display = 'block';
      lightTheme.style.display = 'none';
    } else {
      document.body.classList.toggle('dark-mode');
      darkTheme.style.display = 'none';
      lightTheme.style.display = 'block';
    }
  }

  //   document.body.classList.remove('dark-mode');
  //   document.body.classList.add('light-mode');
  // } else {
  //   document.body.classList.remove('light-mode');
  //   document.body.classList.add('dark-mode');
  // }
};

// register event listeners
slides.forEach((slide) => {
  slide.addEventListener('click', expandItem);
});

orientationButtons.forEach((button) =>
  button.addEventListener('click', changeOrientation)
);

colorModeButton.addEventListener('click', toggleTheme);
