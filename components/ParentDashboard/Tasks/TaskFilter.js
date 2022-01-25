import {useRouter} from "next/router";
import {Divider, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ArrowBackIos, ArrowForwardIos, CalendarViewDay, CalendarViewMonth, CalendarViewWeek} from "@mui/icons-material";
import TodayIcon from '@mui/icons-material/Today';
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";

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
        <Paper

            elevation={0}
            sx={{
                display: 'flex',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: 'wrap',
                padding: theme => theme.spacing(0.5),
                paddingTop: theme => theme.spacing(1),
            }}

        >

            <ToggleButtonGroup>
                <ToggleButton>
                    <CalendarViewDay/>
                </ToggleButton>
                <ToggleButton>
                    <CalendarViewWeek/>
                </ToggleButton>
                <ToggleButton>
                    <CalendarViewMonth/>
                </ToggleButton>
            </ToggleButtonGroup>
            <Divider flexItem orientation="vertical" sx={{mx: 0.5}}/>
            <ToggleButton>
                <TodayIcon/>
            </ToggleButton>
            <Box sx={{flexGrow:1}}/>
            <IconButton color="primary" aria-label="edit" size="medium"
                        onClick={setPrevDate}>
                <ArrowBackIos/>
            </IconButton>
            <Button>
                {dateInfo}
            </Button>
            <Button variant={'outlined'} color="primary" aria-label="edit" size="small"
                    onClick={setNextDate}>
                <ArrowForwardIos/>
            </Button>
        </Paper>
    )
}
