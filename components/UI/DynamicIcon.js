import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import * as React from "react";
import {Grid} from "@mui/material";
import {getContrastColor} from "../../utils/form-tools";

export const DynamicIcon = ({type, name, size = 64, color = '#000'}) => {
    const DynamicComponent = dynamic(() => import(`!@svgr/webpack!/public/images/icons/${type}/${name}.svg`), {
        ssr:false,
    })
    const offset = size * 0.2;
    return (
        <Box sx={{
            width: size,
            height: size,
            backgroundColor: color,
            overflow: "hidden",
            borderRadius: "50% 50%",
        }}>

            <Grid container alignItems={"center"} justifyContent={"center"}
                  sx={{
                      fill: getContrastColor(color),
                      height: "100%",
                      width: "100%",
                      padding: `${offset}px ${offset}px`,
                  }}>
                <Box sx={{position: "relative", width: "100%", height: "100%"}}>
                    <DynamicComponent width={"100%"} height={"100%"}/>
                </Box>
            </Grid>
        </Box>
    );
};
