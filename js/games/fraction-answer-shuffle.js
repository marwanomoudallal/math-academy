// Randomizes the position of the correct answer for every fraction question.
(() => {
  const originalMakeQuestion = FractionKingdom.make.bind(FractionKingdom);

  FractionKingdom.make = function makeShuffledQuestion() {
    const question = originalMakeQuestion();

    for (let index = question.options.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [question.options[index], question.options[randomIndex]] =
        [question.options[randomIndex], question.options[index]];
    }

    return question;
  };
})();
