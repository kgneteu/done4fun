import Logo from '../assets/images/logo.svg'
import Link from "./UI/Link";
import {Grid} from "@mui/material";

const AppLogo = (props) => {
    const size=56;
    return (
        <Link href={'/'}>
            <Grid container alignItems={"center"}>
                <Logo width={size} height={size}/>
            </Grid>
        </Link>
    )

};

export default AppLogo;
