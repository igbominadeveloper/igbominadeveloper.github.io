document.addEventListener('alpine:init', () => {
  Alpine.data('game', () => ({
    guessesAllowed: 5,
    wordLength: 5,
    currentRowIndex: 0,
    currentTileIndex: 0,

    init() {
      this.board = Array.from({ length: this.guessesAllowed }, () =>
        Array.from({ length: this.wordLength }, () => '')
      );
    },

    handleKeyPress(event) {
      if (!this.validKeyPressed(event)) return;

      this.fillTile(event.key);
    },

    validKeyPressed(event) {
      const { key } = event;

      if (key.length === 1 && key.match(/[a-z]/i)) {
        return true;
      }

      if (key === 'Enter') {
        // check if the word is complete and match it with the next random word
      }

      if (key === 'Backspace') {
        if (this.currentRowIndex === 0 && this.currentTileIndex === 0)
          return false;

        if (this.currentTileIndex === 0) {
          this.currentRowIndex--;

          this.currentTileIndex = this.board[this.currentRowIndex].length - 1;

          this.board[this.currentRowIndex][this.currentTileIndex] = '';

          return false;
        }

        this.currentTileIndex--;

        this.board[this.currentRowIndex][this.currentTileIndex] = '';

        return false;
      }

      return false;
    },

    fillTile(key) {
      if (this.currentRowIndex === this.guessesAllowed) return;

      this.board[this.currentRowIndex][this.currentTileIndex] = key;

      if (this.currentTileIndex === this.wordLength - 1) {
        this.currentTileIndex = 0;
        this.currentRowIndex++;
        return;
      }

      this.currentTileIndex++;
    },
  }));
});
