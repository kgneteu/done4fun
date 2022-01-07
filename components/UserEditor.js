import * as React from "react";
import {useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import {Autocomplete, FormControl, FormLabel, MenuItem} from "@mui/material";
import * as PropTypes from "prop-types";
import {formFieldProps, stringAvatar} from "../utils/form-tools";
import {useToken} from "../hooks/useToken";
import {useTranslation} from "next-i18next";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "@mui/material/Avatar";


const Input = styled('input')({
    display: 'none',
});


function TextField2(props) {

    return <TextField {...props}/>;
}

TextField2.propTypes = {
    inputProps: PropTypes.any,
    disabled: PropTypes.bool,
    name: PropTypes.func,
    fullWidth: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.any,
    InputLabelProps: PropTypes.any,
    InputProps: PropTypes.shape({
        ref: PropTypes.func,
        className: PropTypes.string,
        startAdornment: PropTypes.any,
        endAdornment: PropTypes.any
    }),
    label: PropTypes.func,
    size: PropTypes.any,
    variant: PropTypes.string,
    helperText: PropTypes.any,
    margin: PropTypes.string
};

function FileUpload({label, onChange, name}) {
    return <label htmlFor={name}>
        <Input accept={["image/png", "image/jpeg"]}
               id={name}
               onChange={onChange}
               type="file"/>
        <Button variant="contained" component="span">
            {label}
        </Button>
    </label>;
}

const UserEditor = ({user, onClose, onSubmit}) => {
    const {t} = useTranslation();
    const [token, status, currentUser] = useToken();
    const [userList, setUserList] = useState([]);
    const [filter, setFilter] = React.useState("");
    const isAdmin = (currentUser?.role === "admin")
    const isParent = (currentUser?.role === "parent")

    const formik = useFormik({
        initialValues: {
            first_name: user ? user.first_name : '',
            last_name: user ? user.last_name : '',
            email: user ? user.email : '',
            password: '',
            role: user ? user.role : 'parent',
            parent_id: user ? user.parent_id : 0,
            picture: user ? user.picture : "",
            upload: ''
        },
        validationSchema: yup.object({
            first_name: yup.string().required(t("First Name is required")),
            last_name: yup.string().required(t("Last Name is required")),
            email: yup.string().email().required(t("Email is required")),
            password: yup.string().min(6), //.required(t("Password is required")),
            role: yup.string().required(t("Role is required")),
            parent_id: yup.number().integer().min(0).required(t("Parent is required")),
        }),
        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = (values) => {
        if (onSubmit) onSubmit(values)
    }

    const handleClose = () => {
        if (onClose) onClose()
    };

    function searchUser(props) {
        // return [1,2,3]

    }


    // useEffect(() => {
    //     if (token)
    //         apiSearchUser(token, 20, filter)
    //             .then(data => {
    //                 setUserList(data.users ? data.users : [])
    //             })
    //             .catch(e => {
    //                 showToast(ERROR_MSG, e.message)
    //             })
    //
    // }, [token, filter])

    let adminFields = null;
    if (isAdmin) {
        adminFields = (
            <>
                <TextField
                    {...formFieldProps(formik, "role", "Role")}
                    select
                >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'parent'}>Parent</MenuItem>
                    <MenuItem value={'kid'}>Kid</MenuItem>
                </TextField>

                <Autocomplete
                    autoComplete
                    autoSelect
                    // id="combo-box-demo"
                    options={userList}
                    getOptionLabel={(option) => option?.email}

                    onInputChange={(event, newValue) => {
                        setFilter(newValue);
                    }}
                    //filterOptions={(x) => x.email}
                    sx={{width: 300}}
                    renderInput={(params) =>
                        <TextField2 {...params}
                                    fullWidth
                                    {...formFieldProps(formik, "parent_id", "Parent")}
                        />}
                />
            </>
        )
    }

    return (
        <Container component="main" maxWidth="sm">
            <form noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...formFieldProps(formik, "first_name", "First Name")}
                            autoComplete="given-name"
                            required
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            {...formFieldProps(formik, "last_name", "Last Name")}
                            required
                            autoComplete="family-name"
                        />
                    </Grid>
                </Grid>

                <TextField
                    {...formFieldProps(formik, "email", "Email Address")}
                    required
                    autoComplete="email"
                />

                <TextField
                    {...formFieldProps(formik, "password", "Password")}
                    required
                    type="password"
                    autoComplete="new-password"
                />

                {adminFields}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Avatar</FormLabel>
                    <Grid container alignItems={"center"}>
                        <Avatar {...stringAvatar(
                            formik.values['first_name'] + ' ' + formik.values['last_name'], 80)}/>
                        <FileUpload label={t("Change")}
                                    name={"upload"}
                                    onChange={(e)=>formik.setFieldValue("upload", e.target.files[0])}
                        />
                    </Grid>
                </FormControl>
                <DialogActions>
                    <Button variant={"contained"} onClick={handleClose}>{t("Cancel")}</Button>
                    <Button variant={"contained"} type={'submit'}>{t("Save")}</Button>
                </DialogActions>
            </form>
        </Container>
    );
}

export default UserEditor;
