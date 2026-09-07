// Gives player presses a short tactile-looking response in Pattern Memory.
(() => {
  const originalTapPattern = MemoryGame.tapPattern.bind(MemoryGame);

  MemoryGame.showPattern = function showPatternWithTurnMessage() {
    let position = 0;
    const pulse = () => {
      document.querySelectorAll('.pattern-tile').forEach(tile => tile.classList.remove('flash'));

      if (position >= this.state.seq.length) {
        this.state.showing = false;
        const message = document.querySelector('.memory-board + p.center');
        if (message) {
          message.textContent = '👉 Your turn! Repeat the pattern.';
          message.classList.add('your-turn-message');
          message.animate(
            [{ transform: 'scale(.8)', opacity: .2 }, { transform: 'scale(1.08)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }],
            { duration: 420, easing: 'ease-out' }
          );
        }
        return;
      }

      const tile = document.querySelector(`[data-tile="${this.state.seq[position]}"]`);
      if (tile) tile.classList.add('flash');
      position++;
      this.timer = setTimeout(pulse, 650);
    };
    pulse();
  };

  MemoryGame.tapPattern = function tapPatternWithEffect(tileIndex) {
    if (this.state.showing) return;

    const tile = document.querySelector(`[data-tile="${tileIndex}"]`);
    if (tile) {
      tile.animate(
        [
          { transform: 'scale(1)', filter: 'brightness(1)', boxShadow: 'none' },
          { transform: 'scale(.82)', filter: 'brightness(2)', boxShadow: '0 0 30px white' },
          { transform: 'scale(1)', filter: 'brightness(1)', boxShadow: 'none' }
        ],
        { duration: 300, easing: 'ease-out' }
      );
    }

    Rewards.sound('good');
    originalTapPattern(tileIndex);

    if (!this.state.showing && this.state.input) {
      const message = document.querySelector('.memory-board + p.center');
      if (message) message.textContent = `👉 Your turn! ${this.state.input.length} / ${this.state.seq.length}`;
    }
  };
})();
