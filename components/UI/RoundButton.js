import {Fab, Tooltip} from "@mui/material";
import * as React from "react";
import * as PropTypes from "prop-types";

export const RoundButton = ({color, title, children, disabled, sx, ...rest}) => {
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
    let button = <Fab {...rest} disabled={disabled} sx={{...style, ...sx}}>{children}</Fab>;
    if (title !== "" && !disabled) {
        button = (
            <Tooltip title={title} arrow>
                {button}
            </Tooltip>
        )
    }
    return (
        <>{button}</>
    )
};

RoundButton.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.node
};
