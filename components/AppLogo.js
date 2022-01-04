import Logo from '../assets/images/logo.svg'
import Image from "next/image";
const AppLogo = (props) => {
    return (
        // <img src={logo} height={32} width={32} alt={"Done4Fun"}/>
        <Logo width={64} height={64}/>
    )

};

export default AppLogo;
