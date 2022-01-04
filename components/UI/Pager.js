import {Container, Grid, Pagination} from "@mui/material";
import * as React from "react";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";

export const Pager = ({page, total, limit, onChange}) => {
    if (total < 1) {
        return null
    }

    const pageCount = Math.ceil(total / limit);

    return (
        <Grid container justifyContent={"center"} sx={
            {
                my:4,
                ul: {
                    "& .MuiButtonBase-root": {
                        backgroundColor: "#fff"
                    }
                }
        }}>
            <Pagination count={pageCount}
                        boundaryCount={2}
                        page={page}
                        variant="outlined"
                        color="primary"
                        size="large"
                        onChange={onChange}
                        showFirstButton showLastButton
            />
        </Grid>
    )
};

Pager.propTypes = {
    total: PropTypes.any,
    limit: PropTypes.number,
    page: PropTypes.any,
    onChange: PropTypes.func
};
