export const BaseTheme = {
  colors: {
    gray: '#4d4d4d',
    green: '#5FC314',
    blue: '#00C5FF',
    orange: '#FF6901',
  },
};

export const LightTheme = {
  ...BaseTheme,
  colors: {
    ...BaseTheme.colors,
    background: 'white',
    text: 'black',
  },
};

export const DarkTheme = {
  ...BaseTheme,
  colors: {
    ...BaseTheme.colors,
    background: '#434343',
    text: 'white',
  },
};
