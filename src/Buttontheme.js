import {createMuiTheme} from '@material-ui/core/styles';
import {amber,lightBlue,pink} from '@material-ui/core/colors';

const theme =createMuiTheme({
    palette:{
        primary:{
            main:amber[800]
        },
        secondary:{
            main:lightBlue[500],
            coontrastText:amber[800]
        },
        third:{
            main:pink[800],
            coontrastText:amber[800]
        }
    }
})
export default theme;