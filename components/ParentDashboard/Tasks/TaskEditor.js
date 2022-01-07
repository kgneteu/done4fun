import {useTranslation} from "next-i18next";
import {useFormik} from "formik";
import * as yup from "yup";
import {Checkbox, Container, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {formFieldProps} from "../../../utils/form-tools";
import {IconPicker} from "../../UI/IconPicker";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

export const TaskEditor = ({task, onClose, onSubmit}) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            action: task ? task.action : '',
            points: task ? task.points : '1',
            icon: task ? task.icon : '1',
        },
        validationSchema: yup.object({
            name: yup.string().required(t("Task Name is a required field")),
            icon: yup.number(),
        }),

        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = (values) => {
        if (onSubmit) onSubmit(values)
    }
    const handleClose = () => {
        if (onClose) onClose()
    };

    return (
        <Container maxWidth={"sm"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    {...formFieldProps(formik, "action", t("Action Name"))}
                    required
                    autoComplete="task-action"
                    autoFocus
                />
                <IconPicker group={"tasks"}
                            {...formFieldProps(formik, "icon", t("Icon"))}
                />
                <FormGroup>
                    <FormControlLabel
                        label={t("One-time Task")}
                        control={
                            <Checkbox
                                {...formik.getFieldProps('one_time')}
                                checked={formik.values['one_time']}
                            />}/>
                </FormGroup>
                <DialogActions>
                    <Button variant={"contained"} onClick={handleClose}>{t("Cancel")}</Button>
                    <Button variant={"contained"} type={'submit'}>{t("Save")}</Button>
                </DialogActions>
            </form>
        </Container>
    )
};
