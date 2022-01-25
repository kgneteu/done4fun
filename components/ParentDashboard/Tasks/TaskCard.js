import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import {DynamicIcon} from "../../UI/DynamicIcon";
import {stringToColor} from "../../../utils/form-tools";
import {RoundButton} from "../../UI/RoundButton";
import {useToken} from "../../../hooks/useToken";
import {Loader} from "../../UI/Loader";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import {useTranslation} from "next-i18next";

export function TaskCard({task, onTaskEdit, onTaskDelete, onTaskConfirm, onTaskCancel}) {
    const [token, _, user] = useToken()
    const {t} = useTranslation()
    if (!token) return <Loader/>
    let buttons = null;

    if (user.role == "kid") {
        buttons = (
            <>
                <RoundButton title={t("Mark as done")}
                             size="small" onClick={onTaskConfirm} color={'primary'} sx={{mr: 1}}>
                    <CheckIcon/>
                </RoundButton>
                <RoundButton title={t("Cancel task")}
                             size="small" onClick={onTaskCancel} color={'secondary'}>
                    <CancelIcon/>
                </RoundButton>
            </>
        )
    } else {
        buttons = (
            <>
                <RoundButton title={t("Edit task")}
                             size="small" onClick={onTaskEdit} color={'primary'}>
                    <EditIcon/>
                </RoundButton>
                <RoundButton title={t("Delete task")}
                             size="small" onClick={onTaskDelete} color={'error'} sx={{ml: 1}}>
                    <DeleteIcon/>
                </RoundButton>
            </>
        )
    }
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
                {buttons}
            </CardActions>
        </Card>);
}

TaskCard.propTypes = {
    task: PropTypes.any,
    onTaskEdit: PropTypes.func,
    onTaskDelete: PropTypes.func
};
