document.addEventListener('alpine:initialized', () => {
  //we want to focus on the game element
});

document.addEventListener('alpine:init', () => {
  Alpine.data('game', () => ({
    guessesAllowed: 5,
    wordLength: 5,
    currentRowIndex: 0,
    currentTileIndex: 0,
    wordBank: ['gloat', 'fight', 'apple', 'brain', 'polar'],
    currentWord: '',
    tiles: [],

    init() {
      this.resetBoard();

      this.getNextWord();
    },

    get currentTileCharacter() {
      return this.board[this.currentRowIndex][this.currentTileIndex].word;
    },

    get allGuessesUsed() {
      return this.guessesAllowed === this.currentRowIndex + 1;
    },

    resetBoard() {
      this.board = Array.from({ length: this.guessesAllowed }, () =>
        Array.from({ length: this.wordLength }, () => ({
          word: '',
          class: 'default',
        }))
      );
    },

    handleKeyPress(event) {
      const { key } = event;

      if (!this.validKeyPressed(key)) return;

      if (key === 'Enter') {
        this.enterKeyPressed();
        return;
      }

      if (key === 'Backspace') {
        this.backspaceKeyPressed();
        return;
      }

      this.fillTileWithKeyPressed(event.key);
    },

    validKeyPressed(key) {
      if (
        (key.length === 1 && key.match(/[a-z]/i)) ||
        key === 'Enter' ||
        key === 'Backspace'
      ) {
        return true;
      }

      return false;
    },

    enterKeyPressed() {
      // check if the word is complete and match it with the next random word
      const rowTiles = this.board[this.currentRowIndex];
      const word = rowTiles.map((tile) => tile.word).join('');

      if (this.allGuessesUsed) return;

      if (word.length === this.wordLength) {
        // check the current word for correctness
        // for each character in the word, check if it is in the same position as in the original word
        const rowTilesNow = rowTiles.map((tile, index) => {
          // debugger;
          if (tile.word === this.currentWord[index]) {
            tile.class = 'green';
          } else if (this.currentWord.includes(tile.word)) {
            tile.class = 'yellow';
          }
          return tile;
        });

        this.board[this.currentRowIndex] = rowTilesNow;

        // if the tile is perfect
        if (word === this.currentWord) {
          this.tiles.push(word);
          this.getNextWord();
        }

        this.currentTileIndex = 0;
        this.currentRowIndex++;
        return;
      }

      return;
    },

    backspaceKeyPressed() {
      if (
        (this.currentTileCharacter === '' && this.currentTileIndex === 0) ||
        this.allGuessesUsed
      ) {
        return;
      }

      if (this.currentTileCharacter === '') {
        --this.currentTileIndex;
      }

      this.setCurrentTile({ word: '' });
    },

    fillTileWithKeyPressed(key) {
      if (this.currentRowIndex === this.guessesAllowed) return;

      if (
        this.currentTileIndex === this.wordLength - 1 &&
        this.board[this.currentRowIndex][this.currentTileIndex].word !== ''
      )
        return;

      this.setCurrentTile({ word: key });

      if (this.currentTileIndex !== this.wordLength - 1) {
        this.currentTileIndex++;
      }
    },

    getNextWord() {
      const randomIndex = Math.floor(Math.random() * this.wordBank.length);
      const randomWord = this.wordBank[randomIndex];
      this.wordBank.splice(randomIndex, 1);
      this.currentWord = randomWord;
      this.board;
    },

    setCurrentTile({ word, cssClass = 'default' }) {
      this.board[this.currentRowIndex][this.currentTileIndex].word = word;
      this.board[this.currentRowIndex][this.currentTileIndex].class = cssClass;
    },
  }));
});
