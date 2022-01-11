import {useRouter} from "next/router";
import Toolbar from "@mui/material/Toolbar";
import {Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";
import Button from "@mui/material/Button";
import * as React from "react";

export function TaskFilter({viewMode = 0, dateRange, onDateChange}) {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const router = useRouter()

    let dateInfo = null;
    switch (viewMode) {
        default: {
            dateInfo = dateRange.dateFrom.toLocaleDateString(router.locale, options);
        }
    }

    const setNextDate = () => {
        let newDateFrom = new Date()
        let newDateTo = new Date()
        switch (viewMode) {
            default: {
                newDateFrom.setDate(dateRange.dateFrom.getDate() + 1);
                newDateTo.setDate(dateRange.dateTo.getDate() + 1);
                onDateChange({dateFrom: newDateFrom, dateTo: newDateTo})
            }
        }
    }

    const setPrevDate = () => {
        let newDateFrom = new Date()
        let newDateTo = new Date()
        switch (viewMode) {
            default: {
                newDateFrom.setDate(dateRange.dateFrom.getDate() - 1);
                newDateTo.setDate(dateRange.dateTo.getDate() - 1);
                onDateChange({dateFrom: newDateFrom, dateTo: newDateTo})
            }
        }
    }

    return (
        <Toolbar>
            <Grid container>
                <IconButton color="primary" aria-label="edit" size="medium"
                            onClick={setPrevDate}>
                    <ArrowBackIos/>
                </IconButton>
                <Button>
                    {dateInfo}
                </Button>
                <IconButton color="primary" aria-label="edit" size="medium"
                            onClick={setNextDate}>
                    <ArrowForwardIos/>
                </IconButton>
            </Grid>
        </Toolbar>
    )
}
