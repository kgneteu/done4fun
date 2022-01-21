import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import * as React from "react";
import {Grid} from "@mui/material";
import {getContrastColor} from "../../../utils/form-tools";

export const DynamicIcon = ({type, name, size = 128, color = '#000'}) => {
    const DynamicComponent = dynamic(() => import(`!@svgr/webpack!/public/images/icons/${type}/${name}.svg`), {
        ssr: false,
    })
    return (
        <Box sx={{
            width: size,
            height: size,
            backgroundColor: color,
            overflow: "hidden",

        }}>

            <Grid container alignItems={"center"} justifyContent={"center"}
                  sx={{
                      fill: getContrastColor(color),
                      border: "1px solid red",
                      height: "100%",
                      width: "100%",
                  }}>
                <Box sx={{position: "relative", width: "100%", height: "100%"}}>
                        <DynamicComponent style={{width: "100%", height: "100%"}}/>
                </Box>
            </Grid>
        </Box>
    );
};
