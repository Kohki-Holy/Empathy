const noflash = `
(function() {
  var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  var userPrefersDarkMode = darkModeQuery.matches

  var userSetTheme

  try {
    userSetTheme = localStorage.getItem('theme')
  } catch (err) {}

  var userSetDarkMode = userSetTheme == 'dark'

  window.__changeTheme = function changeTheme(t) {
    try {
      localStorage.setItem('theme', t)
    } catch (err) {}
    window.__theme = t
    document.body.className = t
  }

  __changeTheme(userPrefersDarkMode || userSetDarkMode ? 'dark' : 'light')
})();
`;
export default noflash;
