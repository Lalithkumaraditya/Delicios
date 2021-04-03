import {createMuiTheme} from '@material-ui/core/styles';
import {cyan,pink} from '@material-ui/core/colors';

const theme =createMuiTheme({
    palette:{
        primary:{
            main:cyan[500]
        },
        secondary:{
            main:pink[500],
            coontrastText:cyan[600]
        },
        root: {
            backgroundColor: '#80deea',
          },
    }
})
export default theme;