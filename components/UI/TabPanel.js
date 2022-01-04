import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const TabPanel = ({children, value, index, ...other}) => {
    return (
        <div
            hidden={value !== index}
            id={`tab-panel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

export default TabPanel
