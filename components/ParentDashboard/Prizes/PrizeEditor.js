import {useTranslation} from "next-i18next";
import {useFormik} from "formik";
import * as yup from "yup";
import {Checkbox, Container, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {formFieldProps} from "../../../utils/form-tools";
import {IconPicker} from "../../UI/IconPicker";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

export const PrizeEditor = ({prize, onClose, onSubmit}) => {
    const {t} = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: prize ? prize.name : '',
            points: prize ? prize.points : '1',
            icon: prize ? prize.icon : '1',
            one_time: prize ? prize.one_time : false,
        },
        validationSchema: yup.object({
            name: yup.string().required(t("Prize Name is a required field")),
            points: yup.number().min(1, t("The allowed range of points is 1-1000")).max(1000, t("The allowed range of points is 1-1000")).required(t("Points is a required field")),
            icon: yup.number(),
            one_time: yup.bool(),
        }),

        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = async (values) => {
        if (onSubmit) await onSubmit(values)
        formik.setSubmitting(false)
    }


    return (
        <Container maxWidth={"sm"}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    {...formFieldProps(formik, "name", t("Prize Name"))}
                    required
                    autoComplete="prize-name"
                    autoFocus
                />
                <TextField
                    {...formFieldProps(formik, "points", t("Points"))}
                    required
                    type={"number"}
                    pattern="[0-9]{10}"
                    autoComplete="prize-points"
                />
                <IconPicker group={"prizes"}
                            {...formFieldProps(formik, "icon", t("Icon"))}
                />
                <FormGroup>
                    <FormControlLabel
                        label={t("One-time Prize")}
                        control={
                            <Checkbox
                                {...formik.getFieldProps('one_time')}
                                checked={formik.values['one_time']}
                            />}/>
                </FormGroup>
                <DialogActions>
                    <Button variant={"contained"} onClick={onClose}>{t("Cancel")}</Button>
                    <Button variant={"contained"} type={'submit'} disabled={formik.isSubmitting}>{t("Save")}</Button>
                </DialogActions>
            </form>
        </Container>
    )
};
