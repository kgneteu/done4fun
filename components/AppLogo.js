import Logo from '../assets/images/logo.svg'
import Link from "./UI/Link";
import {Fab, Grid} from "@mui/material";

const AppLogo = (props) => {
    const size="100%"
    return (
        <Link href={'/'}>
            <Fab size={'large'} sx={{overflow: "hidden"}}>
            {/*<Grid container alignItems={"center"}>*/}
                <Logo width={size} height={size}/>
            {/*</Grid>*/}
            </Fab>
        </Link>
    )

};

export default AppLogo;
