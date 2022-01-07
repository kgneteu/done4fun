import {useToken} from "../../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../../utils/toasts";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {Grid} from "@mui/material";
import ResponsiveDialog from "../../UI/ResponsiveDialog";
import Typography from "@mui/material/Typography";
import {Loader} from "../../UI/Loader";
import {useDeleteConfirm} from "../../../hooks/useDeleteConfirm";
import {apiCreateTask, apiDeleteTask, apiGetAvailableTasks, apiGetTask, apiUpdateTask} from "../../../utils/api";
import {TaskCard} from "./TaskCard";
import {TaskEditor} from "./TaskEditor";

export const AvailableTasks = ({user: kid}) => {
        const [token, status] = useToken()
        const [tasks, setTasks] = useState(null)
        const {t} = useTranslation();
        const confirm = useDeleteConfirm();
        const [dialogOpen, setDialogOpen] = useState(false)
        const [dialog, setDialog] = useState(null);
        const [dialogTitle, setDialogTitle] = useState(null);
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            if (token) reload()
        }, [token])

    console.log(tasks)
        const reload = () => {
            if (token) apiGetAvailableTasks(token, kid.id)
                .then(data => {
                    setTasks(data.tasks)
                })
                .catch(e => {
                    showToast(ERROR_MSG, e.message)
                }).finally(() => setLoading(false))
        };

        if (loading || !token) return <Loader/>

        const handleDialogClose = () => {
            setDialogOpen(false)
            setDialog(null)
            setDialogTitle(null)
        }

        const handleTaskDelete = id => {
            confirm().then(() => {
                    apiDeleteTask(token, id)
                        .then(() => {
                                showToast(SUCCESS_MSG, t("Prize has been deleted!"))
                                reload();
                            }
                        )
                        .catch(err => showToast(ERROR_MSG, err.message))
                }
            )
        };

        const handleTaskUpdate = (id, values) => {
            apiUpdateTask(token, id, {...values})
                .then(() => {
                        showToast(SUCCESS_MSG, t("Task has been saved!"))
                        reload();
                        handleDialogClose()
                    }
                )
                .catch(err => showToast(ERROR_MSG, err.message))
        }

        const handleTaskCreate = values => {
            apiCreateTask(token, kid.id, {...values})
                .then(() => {
                        showToast(SUCCESS_MSG, t("Task has been created!"))
                        reload();
                        handleDialogClose()
                    }
                )
                .catch(err => showToast(ERROR_MSG, err.message))
        };

        const handleTaskEdit = id => {
            apiGetTask(token, id)
                .then((task) => {
                    if (task?.task && task.task.id === id) {
                        setDialogTitle(t("Edit Task"))
                        setDialog(<TaskEditor task={task.task} onClose={handleDialogClose}
                                               onSubmit={(values) => handleTaskUpdate(id, values)}/>)
                        setDialogOpen(true)
                    }
                })
                .catch(err => showToast(ERROR_MSG, err.message))
        };


        const handleTaskAdd = () => {
            setDialogTitle(t("New Task"))
            setDialog(<TaskEditor onClose={handleDialogClose} onSubmit={(values) => handleTaskCreate(values)}/>)
            setDialogOpen(true)
        };

        return (
            <>
                <IconButton color="primary" aria-label="edit" size="medium"
                            onClick={() => handleTaskAdd()}>
                    <AddIcon/>
                    <Typography>{t("Add Task")}</Typography>
                </IconButton>
                <Box sx={{p: 2, backgroundColor: grey.A200}}>
                    <Grid container spacing={2} justifyContent={"center"}>
                        {tasks && tasks.map(task => (
                            <Grid item key={task.id}>
                                <TaskCard task={task}
                                           onTaskEdit={() => handleTaskEdit(task.id)}
                                           onTaskDelete={() => handleTaskDelete(task.id)}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <ResponsiveDialog open={dialogOpen} title={dialogTitle} onClose={handleDialogClose}>
                    {dialog}
                </ResponsiveDialog>
            </>
        )
    }
;