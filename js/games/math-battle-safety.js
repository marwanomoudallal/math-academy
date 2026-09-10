// Math Battle has no countdown: health changes only after a submitted answer.
// Ignore duplicate submits for the same question (double-click/Enter cannot deal damage twice).
(() => {
  if (!window.MathBattle) return;
  const originalSubmit = MathBattle.submit.bind(MathBattle);
  let answeredQuestion = null;
  MathBattle.submit = function safeMathSubmit(value) {
    const question = this.state?.q;
    if (!String(value ?? '').trim() || !question || answeredQuestion === question) return;
    answeredQuestion = question;
    return originalSubmit(value);
  };
  const originalRender = MathBattle.render.bind(MathBattle);
  MathBattle.render = function safeMathRender() {
    return originalRender().replace(
      'Answer correctly to attack!',
      'No timer — health changes only after an incorrect answer.'
    );
  };
})();
