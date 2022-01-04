import logo from '../assets/images/logo.svg'
import Image from "next/image";
const AppLogo = (props) => {
    return (
        <Image src={logo} height={64} width={64} alt={"Done4Fun"}/>
    )

};

export default AppLogo;
