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
      //   debugger;
      // validate key here

      this.board[this.currentRowIndex][this.currentTileIndex] = event.key;

      if (this.currentTileIndex === this.wordLength - 1) {
        this.currentTileIndex = 0;
        this.currentRowIndex++;
        return;
      }

      this.currentTileIndex++;
    },
  }));
});
