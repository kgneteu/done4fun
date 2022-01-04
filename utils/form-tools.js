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

export function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
