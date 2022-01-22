import {Card, CardActions, CardContent, Fab, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import dynamic from 'next/dynamic'
import {DynamicIcon} from "../../UI/DynamicIcon";
import {stringToColor} from "../../../utils/form-tools";


function RoundButton({color,children, ...rest}) {

    return (
        <Fab {...rest}>{children}</Fab>
    )
}

RoundButton.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    children: PropTypes.node
};

export function TaskCard({task, onTaskEdit, onTaskDelete}) {
    const x = "2";
    const DynamicLazyComponent = dynamic(() => import(`!@svgr/webpack!/public/images/icons/tasks/${x}.svg`), {
        ssr: false,
    })
    //const {error, loading, icon} = useSVGIcon(`/images/icons/tasks/${task.icon}.svg`,{})

    //const {error, loading, icon} = useSVGIcon(`22`)
    //console.log(error, loading, icon)
    return (
        <Card sx={{width: "280px"}}>
            <CardContent>
                    <DynamicIcon type={'tasks'} name={task.icon} color={stringToColor(task.action)}/>
                    <Typography variant="body2">
                        {task.action}
                    </Typography>
            </CardContent>
            <CardActions disableSpacing={true}>
                <CasinoIcon color={"disabled"}/>{task.points}
                <Box sx={{flexGrow: 1}}/>
                <RoundButton size="small" onClick={onTaskEdit} color={'primary'}>
                    <EditIcon/>
                </RoundButton>

                <RoundButton size="small" onClick={onTaskDelete}>
                    <DeleteIcon/>
                </RoundButton>
            </CardActions>
        </Card>);
}

TaskCard.propTypes = {
    task: PropTypes.any,
    onTaskEdit: PropTypes.func,
    onTaskDelete: PropTypes.func
};
