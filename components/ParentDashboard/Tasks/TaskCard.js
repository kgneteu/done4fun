import {Card, CardActions, CardContent} from "@mui/material";
import SVG from "../../SVG";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";

export function TaskCard({task, onTaskEdit, onTaskDelete}) {
    return (
        <Card sx={{width: "180px"}}>
            {/*<SvgIcon color={'primary'} width={32} height={32} component={`/images/icons/tasks/${task.icon}.svg`}/>*/}
            <img width={32} height={32} src={`/images/icons/tasks/${task.icon}.svg`}/>
            <SVG width={32} height={32} src={`assets/icons/tasks/${task.icon}.svg?url`}/>
            <CardContent>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {task.action}
                </Typography>
            </CardContent>

            <CardActions disableSpacing={true}>
                <CasinoIcon color={"disabled"}/>{task.points}
                <Box sx={{flexGrow: 1}}/>
                <IconButton onClick={onTaskEdit} color={'primary'}>
                    <EditIcon/>
                </IconButton>

                <IconButton onClick={onTaskDelete} color={'error'}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>);
}

TaskCard.propTypes = {
    task: PropTypes.any,
    onTaskEdit: PropTypes.func,
    onTaskDelete: PropTypes.func
};
