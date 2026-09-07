// Keeps every Math Battle value within the two-digit range (0–99).
(() => {
  const randomBetween = (minimum, maximum) =>
    minimum + Math.floor(Math.random() * (maximum - minimum + 1));

  MathBattle.makeQuestion = function makeTwoDigitQuestion() {
    const limit = { Easy: 10, Normal: 25, Hard: 60, Expert: 99 }[Player.data.settings.difficulty] || 25;
    const symbols = ['+', '−', '×', '÷'];
    let symbol = symbols[Math.floor(Math.random() * symbols.length)];

    if (this.state.category !== 'Mixed Math') {
      symbol = {
        Addition: '+',
        Subtraction: '−',
        Multiplication: '×',
        Division: '÷'
      }[this.state.category];
    }

    let first;
    let second;
    let answer;

    if (symbol === '+') {
      first = randomBetween(1, Math.min(limit, 98));
      second = randomBetween(1, Math.min(limit, 99 - first));
      answer = first + second;
    } else if (symbol === '−') {
      first = randomBetween(2, limit);
      second = randomBetween(1, first);
      answer = first - second;
    } else if (symbol === '×') {
      first = randomBetween(1, Math.min(12, limit));
      second = randomBetween(1, Math.min(12, Math.floor(99 / first)));
      answer = first * second;
    } else {
      second = randomBetween(1, Math.min(12, limit));
      answer = randomBetween(1, Math.min(12, Math.floor(99 / second)));
      first = second * answer;
    }

    return {
      text: `${first} ${symbol} ${second} = ?`,
      answer,
      explain: `${first} ${symbol} ${second} equals ${answer}.`
    };
  };
})();
