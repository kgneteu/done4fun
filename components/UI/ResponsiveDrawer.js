import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material";

export const DrawerWidth = 280;

export function ResponsiveDrawer({open, onClose, children}) {
    return <Box
        component="nav"
        sx={{width: {md: DrawerWidth}, flexShrink: {sm: 0}}}
        aria-label="navigation"
    >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
            variant="temporary"
            anchor={'right'}
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: {xs: "block", md: "none"},
                "& .MuiDrawer-paper": {boxSizing: "border-box", width: DrawerWidth},
            }}
        >
            {children}
        </Drawer>
        <Drawer
            variant="permanent"
            anchor={'right'}
            sx={{
                display: {xs: "none", md: "block"},
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: DrawerWidth,
                    position: "relative",
                    minHeight: "100%",
                    border: "none"
                },
                "&": {height: "100%"}
            }}
            open
        >
            {children}
        </Drawer>
    </Box>;
}

ResponsiveDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node
};

