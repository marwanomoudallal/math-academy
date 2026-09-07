// Keeps the correct answer visible long enough to learn from a mistake.
(() => {
  const originalSubmit = MathBattle.submit.bind(MathBattle);

  MathBattle.submit = function submitWithCorrectAnswer(value) {
    const question = this.state?.q;
    const typedValue = String(value).trim();
    const isWrong = typedValue !== '' && Number(typedValue) !== question?.answer;

    originalSubmit(value);

    if (isWrong && question) {
      const language = Player.data.settings.language || 'en';
      const message = language === 'ar'
        ? `❌ الإجابة الصحيحة هي ${question.answer}`
        : language === 'fr'
          ? `❌ La bonne réponse est ${question.answer}`
          : `❌ The correct answer is ${question.answer}`;
      const feedback = document.querySelector('#feedback');
      if (feedback) {
        feedback.innerHTML = `<strong>${message}</strong><br><span class="muted">${question.explain}</span>`;
        feedback.classList.add('wrong-answer-feedback');
      }
      Rewards.toast(message);
    }
  };
})();
