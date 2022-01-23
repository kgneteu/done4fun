import {Fab} from "@mui/material";
import * as React from "react";
import * as PropTypes from "prop-types";

export const RoundButton = ({color, children, sx, ...rest}) => {
    const style = {
        color: theme => theme.palette[color].contrastText,
        bgcolor: theme => theme.palette[color].main,
        '&:hover': {
            bgcolor: theme => theme.palette[color].dark,
        },
        '&:active': {
            bgcolor: theme => theme.palette[color].dark,
        },
    };
    return (
        <Fab {...rest} sx={{...style,...sx}}>{children}</Fab>
    )
};

RoundButton.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.node
};
