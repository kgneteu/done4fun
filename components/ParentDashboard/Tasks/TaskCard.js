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
import dynamic from 'next/dynamic'
import {DynamicIcon} from "./DynamicIcon";
import {stringToColor} from "../../../utils/form-tools";


export function TaskCard({task, onTaskEdit, onTaskDelete}) {
    const x = "2";
    const DynamicLazyComponent = dynamic(() => import(`!@svgr/webpack!/public/images/icons/tasks/${x}.svg`), {
        ssr: false,
    })
    //const {error, loading, icon} = useSVGIcon(`/images/icons/tasks/${task.icon}.svg`,{})

    //const {error, loading, icon} = useSVGIcon(`22`)
    //console.log(error, loading, icon)
    return (
        <Card sx={{width: "180px"}}>
            {/*<SvgIcon color={'primary'} width={32} height={32} component={`/images/icons/tasks/${task.icon}.svg`}/>*/}
            {/*<Suspense fallback={`loading`}>*/}
            <DynamicIcon type={'tasks'} name={task.icon} color={stringToColor(task.action)}/>
            {/*<DynamicLazyComponent type={'tasks'} name={task.icon}*/}
            {/*</Suspense>*/}
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
