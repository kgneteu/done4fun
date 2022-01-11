import {useTranslation} from "next-i18next";
import {useFormik} from "formik";
import * as yup from "yup";
import {Container, MenuItem, TextField} from "@mui/material";
import {formFieldProps} from "../../../utils/form-tools";
import {IconPicker} from "../../UI/IconPicker";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DaySelect} from "./DaySelect";
import AdapterDateFns from '@mui/lab/AdapterMoment';
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import * as React from "react";

export const TaskEditor = ({task, onClose, onSubmit}) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            action: task ? task.action : '',
            icon: task ? task.icon : '1',
            points: task ? task.points : '1',
            cycle_type: task ? task.cycle_type : 0,
            selected_days: task ? task.selected_days : 0,
            start_at: task ? task.start_at : 0,
        },
        validationSchema: yup.object({
            action: yup.string().required(t("Task Name is a required field")),
            points: yup.number().min(1, t("The allowed range of points is 1-1000")).max(1000, t("The allowed range of points is 1-1000")).required(t("Points is a required field")),
            icon: yup.number(),
            cycle_type: yup.number().min(0).max(4).required(),
        }),

        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = async (values) => {
        if (onSubmit) await onSubmit(values)
        formik.setSubmitting(false)
    }

    // function monthChanged(value) {
    //     formik.setFieldValue("selected_days", value)
    // }

    function cycleTypeChange(ev) {
        formik.setFieldValue("selected_days", 0).then(
            () => formik.setFieldValue("cycle_type", ev.target.value)
        )

    }

    return (
        <Container maxWidth={"sm"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    {...formFieldProps(formik, "action", t("Action"))}
                    required
                    autoComplete="task-action"
                    autoFocus
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) =>
                            <TextField {...props} />}
                        label="Start Date"
                        value={formik.values["start_at"]}
                        onChange={(newValue) => {
                             formik.setFieldValue("start_at", newValue)
                         }}
                    />
                </LocalizationProvider>
                <TextField
                    {...formFieldProps(formik, "points", t("Points"))}
                    required
                    type={"number"}
                    pattern="[0-9]{10}"
                    autoComplete="prize-points"
                />
                <IconPicker group={"tasks"}
                            {...formFieldProps(formik, "icon", t("Icon"))}
                />

                <TextField
                    {...formFieldProps(formik, "cycle_type", "Repeat")}
                    onChange={cycleTypeChange}
                    select
                >
                    <MenuItem value={0}>{t("Never")}</MenuItem>
                    <MenuItem value={1}>{t("Everyday")}</MenuItem>
                    <MenuItem value={2}>{t("Selected days of the week")}</MenuItem>
                    <MenuItem value={3}>{t("Selected days of the month")}</MenuItem>
                </TextField>

                {formik.values["cycle_type"] > 1 &&
                <DaySelect
                    id="selected_days"
                    mode={formik.values["cycle_type"] - 2}
                    name="selected_days"
                    value={formik.values["selected_days"]}
                    onChange={formik.handleChange}
                />}

                <DialogActions>
                    <Button variant={"contained"} onClick={onClose}>{t("Cancel")}</Button>
                    <Button variant={"contained"}
                            type={'submit'}
                            disabled={formik.isSubmitting}>
                        {t("Save")}</Button>
                </DialogActions>
            </form>
        </Container>
    )
};
