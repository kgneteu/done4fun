import {createTheme} from '@mui/material/styles';
import {blue, grey, lightBlue, red, yellow} from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#01579b',
        },
        secondary: {
            main: '#2e7d32',
        },

        error: {
            main: red.A400,
        },
        background: {
            default: grey["50"],
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor: grey['300'],
                },
            },
        },
        MuiIconButton:{
            defaultProps:{
                color: "secondary",
            }
        }
    }
});

export default theme;
