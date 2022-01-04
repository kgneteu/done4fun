export function formFieldProps(formik, name, label, fullWidth = true) {
    return {
        ...formik.getFieldProps(name),
        variant: 'outlined',
        fullWidth: fullWidth,
        error: Boolean(formik.errors[name] && formik.touched[name]),
        helperText: formik.errors[name] && formik.touched[name] && formik.errors[name],
        name: name,
        id: name,
        margin: 'normal',
        label: label,
    };
}
