import {useToken} from "../../../hooks/useToken";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../../utils/toasts";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import {Fab, Grid} from "@mui/material";
import ResponsiveDialog from "../../UI/ResponsiveDialog";
import {Loader} from "../../UI/Loader";
import {useDeleteConfirm} from "../../../hooks/useDeleteConfirm";
import {
    apiCancelTask,
    apiConfirmTask,
    apiCreateTask,
    apiDeleteTask,
    apiGetAvailableTasks,
    apiGetTask,
    apiUpdateTask
} from "../../../utils/api";
import {TaskCard} from "./TaskCard";
import {TaskEditor} from "./TaskEditor";
import {TaskFilter} from "./TaskFilter";

export const AvailableTasks = ({user: kid}) => {
        const [token, _, user] = useToken()
        const [tasks, setTasks] = useState(null)
        const [dateRange, setDateRange] = useState({
            dateFrom: new Date(),
            dateTo: new Date()
        })
        const {t} = useTranslation();
        const confirm = useDeleteConfirm();
        const [dialog, setDialog] = useState(null);
        const [loading, setLoading] = useState(true)

        useEffect(() => {
            if (token) reload()
        }, [token, reload])


        const reload = () => {
            console.log('task reload1')
            if (token) {
                console.log('task reload2')
                apiGetAvailableTasks(token, kid.id, dateRange.dateFrom, dateRange.dateTo)
                    .then(data => {
                        setTasks(data.tasks)
                    })
                    .catch(e => {
                        showToast(ERROR_MSG, e.message)
                    }).finally(() => setLoading(false))
            }
        };

        if (loading || !token) return <Loader/>

        const handleDialogClose = () => {
            setDialog(null)
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


        const handleTaskUpdate = async (id, values) => {
            try {
                await apiUpdateTask(token, id, {...values})
                showToast(SUCCESS_MSG, t("Task has been saved!"))
                reload();
                handleDialogClose()
            } catch (e) {
                showToast(ERROR_MSG, e.message)
            }
        }

        const handleTaskCreate = async (values) => {
            try {
                await apiCreateTask(token, kid.id, {...values})
                showToast(SUCCESS_MSG, t("Task has been created!"))
                reload();
                handleDialogClose()
            } catch (e) {
                showToast(ERROR_MSG, e.message)
            }
        };

        const handleTaskEdit = id => {
            apiGetTask(token, id)
                .then((task) => {
                    if (task?.task && task.task.id === id) {
                        setDialog({
                            component: <TaskEditor task={task.task} onClose={handleDialogClose}
                                                   onSubmit={(values) => handleTaskUpdate(id, values)}/>,
                            title: t("Edit Task"),
                        })
                    }
                })
                .catch(err => showToast(ERROR_MSG, err.message))
        };


        const handleTaskAdd = () => {
            setDialog({
                component: <TaskEditor onClose={handleDialogClose} onSubmit={(values) => handleTaskCreate(values)}/>,
                title: t("New Task"),
            })
        };

        const handleTaskConfirm = async (id) => {
            try {
                await apiConfirmTask(token, id)
                showToast(SUCCESS_MSG, t("Task has been mark as done!"))
                reload();
            } catch (e) {
                showToast(ERROR_MSG, e.message)
            }
        };

        const handleTaskCancel = async (id) => {
            try {
                await apiCancelTask(token, id)
                showToast(SUCCESS_MSG, t("Task has been cancelled!"))
                reload();
            } catch (e) {
                showToast(ERROR_MSG, e.message)
            }
        };

        const handleDateChange = dateRange => {
            setDateRange({...dateRange})
            reload()
        };

        return (
            <>
                <TaskFilter dateRange={dateRange} onDateChange={handleDateChange}/>
                <Box sx={{p: 2, backgroundColor: grey.A200}}>
                    <Grid container spacing={2} justifyContent={"center"}>
                        {tasks && tasks.map(task => (
                            <Grid item key={task.id}>
                                <TaskCard task={task}
                                          onTaskEdit={() => handleTaskEdit(task.id)}
                                          onTaskDelete={() => handleTaskDelete(task.id)}
                                          onTaskConfirm={() => handleTaskConfirm(task.id)}
                                          onTaskCancel={() => handleTaskCancel(task.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {user.role !== "kid" &&
                    <Fab title={t("Add new task")}
                         color={"primary"} sx={{position: "fixed", bottom: "2rem", right: "2rem"}}
                         onClick={handleTaskAdd}>
                        <AddIcon/>
                    </Fab>
                }
                {dialog && <ResponsiveDialog open={true} title={dialog.title} onClose={handleDialogClose}>
                    {dialog.component}
                </ResponsiveDialog>}
            </>
        )
    }
;
