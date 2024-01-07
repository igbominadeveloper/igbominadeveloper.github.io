const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('button');
const slider = document.querySelector('.slider');

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

slides.forEach((slide) => {
  slide.addEventListener('click', expandItem);
});

buttons.forEach((button) =>
  button.addEventListener('click', changeOrientation)
);
