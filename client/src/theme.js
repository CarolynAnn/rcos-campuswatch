import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    type: 'dark',
    text: {
      main:'#FFF',
      dark:'#000',
      primary:'#FFF'
    },
    primary: {
      main: '#F74747',
      dark: '#641C22',
      contrastText: '#f0f',
    },
    secondary: {
      main: '#64B42D',
      dark: '#008732',
      contrastText: '#f0f',
    },
    error: {
      main: '#BD0043',
      contrastText: '#fff',
    },
    divider: 'rgba(18, 18, 18, 0.2)',
    background: {
      paper: '#2D2D2D',
      default: "#ff0000"
    },
  },
});
