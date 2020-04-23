javascript: (function () {
  function addJiraLinks(text) {
    return text.replace(
      /(\/)?([A-Z]+-[0-9]+)(\]\()?/g,
      /* checa se começa com / para nao estragar links */
      /* checa se termina com ]( para nao estragar links do markdown */
      (orig, open, issue, close) => {
        return (open || close) ? orig : `[${issue}](http://jira.tokenlab.com.br/browse/${issue})`;
      }
    );
  }

  function onKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey && (event.target.id === 'post_textbox' || event.target.id === 'edit_textbox')) {
      event.target.value = addJiraLinks(event.target.value);
      event.target.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  if (window.__ON_KEY_PRESS__) {
    document.body.removeEventListener('keypress', window.__ON_KEY_PRESS__, true);
  }

  window.__ON_KEY_PRESS__ = onKeyPress;
  document.body.addEventListener('keypress', onKeyPress, true);
}());
