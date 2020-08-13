import { useState } from 'react';

const isBrowser = typeof window !== 'undefined';

const initialState = () => {
  if (isBrowser) {
    return window.__theme === 'dark' ? 'dark' : 'light';
  }
};

const useTheme = () => {
  const [theme, switchTheme] = useState(initialState());

  const toggleTheme = () => {
    let darkMode = theme === 'dark';
    let inverseTheme = darkMode ? 'light' : 'dark';

    if (isBrowser) {
      window.__changeTheme(inverseTheme);
    }
    switchTheme(darkMode ? 'light' : 'dark');
  };

  return [toggleTheme];
};

export default useTheme;
