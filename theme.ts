import { createMuiTheme } from '@material-ui/core/styles';

import * as colors from './colors';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: colors.grape1,
      main: colors.grape3,
      dark: colors.grape5,
      contrastText: '#fff',
    },
    secondary: {
      light: colors.aqua1,
      main: colors.aqua3,
      dark: colors.aqua5,
      contrastText: '#fff',
    },
  },
});
