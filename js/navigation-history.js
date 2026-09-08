/* Consistent back navigation for every screen, including extension games. */
(function () {
  if (!window.App || App.__backNavigationReady) return;

  const stack = [];
  const originalNavigate = App.navigate.bind(App);
  let restoring = false;

  App.navigate = function (page) {
    if (!restoring && this.current && page !== this.current) {
      stack.push(this.current);
      if (stack.length > 30) stack.shift();
    }
    return originalNavigate(page);
  };

  App.back = function () {
    const previous = stack.pop() || 'home';
    restoring = true;
    try {
      return originalNavigate(previous);
    } finally {
      restoring = false;
    }
  };

  function addBackButton() {
    const screen = document.querySelector('#screen');
    if (!screen || App.current === 'home' || document.body.classList.contains('guide-active')) return;
    if (screen.querySelector('[data-app-back]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'app-back-button btn ghost';
    button.dataset.appBack = 'true';
    button.setAttribute('aria-label', 'Go back');
    button.textContent = '◀ Back';
    button.addEventListener('click', () => App.back());
    screen.prepend(button);
  }

  const originalRender = App.render.bind(App);
  App.render = function () {
    const result = originalRender();
    addBackButton();
    return result;
  };
  const originalRenderGame = App.renderGame?.bind(App);
  if (originalRenderGame) {
    App.renderGame = function () {
      const result = originalRenderGame(...arguments);
      addBackButton();
      return result;
    };
  }

  document.addEventListener('keydown', event => {
    if (event.altKey && event.key === 'ArrowLeft') {
      event.preventDefault();
      App.back();
    }
  });
  App.__backNavigationReady = true;
})();
