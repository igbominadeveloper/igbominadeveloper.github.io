const slides = document.querySelectorAll('.slide');

const expandItem = (event) => {
  const element = event.currentTarget;
  element.style.width = '100%';
  //remove flex from other ones
};

slides.forEach((slide) => {
  slide.addEventListener('click', expandItem);
});
