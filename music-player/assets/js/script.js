const button = document.querySelector('.play-pause');
const pauseIcon = document.getElementsByClassName('pause-icon')[0];
const playIcon = document.getElementsByClassName('play-icon')[0];
const bars = document.getElementsByClassName('bar');
const fileNameContainer = document.querySelector('.file-name');
const songUrlInput = document.querySelector('#song-url');

const song = new Audio('assets/mp3/asa-eyo.mp3');

const fileName = () => song.src.split('/').pop();

const setFileName = () => {
  fileNameContainer.innerHTML = `Filename: ${fileName()}`;
};

let interval = null;

setFileName();

const resetToDefault = () => {
  hideBars();

  playIcon.classList.remove('paused');

  pauseIcon.classList.add('paused');

  button.removeEventListener('click', pauseSong);
  button.addEventListener('click', playSong);
};

const playSong = () => {
  song.play();

  playIcon.classList.add('paused');

  pauseIcon.classList.remove('paused');

  showBars();

  button.removeEventListener('click', playSong);
  button.addEventListener('click', pauseSong);

  song.addEventListener('ended', () => {
    resetToDefault();
  });
};

const pauseSong = () => {
  song.pause();

  resetToDefault();
};

const showBars = () => {
  interval = setInterval(() => {
    for (let i = 0; i < bars.length; i++) {
      const randomNumber = Math.floor(Math.random() * bars.length) + 1;
      // number between 1 * 5

      const height = randomNumber * 20;
      // we are multiplying the random number by 10 to get the height of the bar

      bars[i].style.height = `${height}px`;
    }
  }, 200);
};

const hideBars = () => {
  // we need to clear the interval so that the bars don't keep popping up
  clearInterval(interval);

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = '0px';
  }
};

button.addEventListener('click', () => {
  if (pauseIcon.classList.contains('paused')) {
    playSong();
  } else {
    pauseSong();
  }
});

const changeRoute = (route) => {
  location.hash = route;
};

const changeSong = () => {
  const songUrl = songUrlInput.value;

  if (songUrl.length === 0) return;

  const fileExtension = songUrl.split('.').pop();

  if (fileExtension !== 'mp3') {
    alert('Please enter a valid mp3 file');
    return;
  }

  song.src = songUrl;

  clearInput();
  closeModal();
  pauseSong();
  setFileName();
};

const closeModal = () => {
  clearInput();
  changeRoute('#');
};

const clearInput = () => {
  songUrlInput.value = '';
};
