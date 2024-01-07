const slides = document.querySelectorAll('.slide');

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

slides.forEach((slide) => {
  slide.addEventListener('click', expandItem);
});
