export const BaseTheme = {
  colors: {
    gray: '#4d4d4d',
    green: '#5FC314',
    blue: '#00C5FF',
    orange: '#FF6901',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
  },
  borderWidth: {
    thin: 1,
    medium: 2,
    thick: 4,
  },
  shadow: {
    sm: {
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
    },
    md: {
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3,
    },
    lg: {
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
  },
  opacity: {
    high: 1,
    medium: 0.75,
    low: 0.5,
    veryLow: 0.25,
    faint: 0.1,
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
    buttonBackground: '#646464',
    buttonBorder: '#858585',
  },
};
