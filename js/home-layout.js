// Keep the connected campaign task beside the original daily task list.
(() => {
  const placeDailyAdventure = () => {
    if (App.current !== 'home') return;
    const adventure = document.querySelector('.daily-adventure');
    const headings = [...document.querySelectorAll('.section-title')];
    const dailyHeading = headings.find(element => element.textContent.includes('Daily Challenges'));
    const taskList = dailyHeading?.nextElementSibling;
    if (adventure && taskList?.classList.contains('challenge-list')) {
      adventure.classList.add('daily-challenge-row');
      const label = adventure.querySelector(':scope > div > span');
      if (label) label.textContent = label.textContent.replace('🔥', '').trim();
      taskList.insertAdjacentElement('afterend', adventure);
    }
  };

  const originalRender = App.render.bind(App);
  App.render = function renderWithHomeLayout() {
    const result = originalRender();
    placeDailyAdventure();
    return result;
  };

  placeDailyAdventure();
})();
