import {useTranslation} from "next-i18next";
import {useFormik} from "formik";
import * as yup from "yup";
import {Container, FormGroup, MenuItem, TextField, ToggleButton} from "@mui/material";
import {formFieldProps} from "../../../utils/form-tools";
import {IconPicker} from "../../UI/IconPicker";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function getWeekDays(locale) {
    const baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, {weekday: 'narrow'}));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
}

function DaySelect({mode = 0, name, value, onChange}) {
    const updateValue = item => {
        const newValue = value ^ (2 ** item);
        if (onChange) onChange(newValue)
    };

    return (
        <FormGroup row>
            {[...Array(mode == 0 ? 7 : 31).keys()].map(item => (
                <ToggleButton
                    key={item + 1}
                    value={item + 1}
                    selected={value & (2 ** item)}
                    onChange={() => {
                        updateValue(item);
                    }}
                    sx={{width: "3rem"}}
                >
                    {mode == 0 ? getWeekDays()[item] : item + 1}
                </ToggleButton>
            ))}
        </FormGroup>
    )
}


export const TaskEditor = ({task, onClose, onSubmit}) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            action: task ? task.action : '',
            icon: task ? task.icon : '1',
            cycle_type: task ? task.cycle_type : 0,
            selected_days: task ? task.selected_days : 0,
        },
        validationSchema: yup.object({
            action: yup.string().required(t("Task Name is a required field")),
            icon: yup.number(),
            cycle_type: yup.number().min(0).max(4).required(),
        }),

        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = async (values) => {
        if (onSubmit) await onSubmit(values)
        formik.setSubmitting(false)
    }

    function monthChanged(value) {
        formik.setFieldValue("selected_days", value)
    }

    function cycleTypeChange(ev) {
        formik.setFieldValue("selected_days", 0).then(
            ()=>formik.setFieldValue("cycle_type", ev.target.value)
        )

    }

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
                    mode={formik.values["cycle_type"] - 2}
                    name={"selected_days"}
                    value={formik.values["selected_days"]}
                    onChange={event => monthChanged(event)}
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
