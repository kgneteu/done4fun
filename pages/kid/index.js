import * as React from "react";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {formFieldProps} from "../../utils/form-tools";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import {Autocomplete, MenuItem, Paper} from "@mui/material";
import {apiSearchUser} from "../../utils/api";
import {signIn, useSession} from "next-auth/react";
import {Loader} from "../../components/UI/Loader";
import * as PropTypes from "prop-types";
import {ERROR_MSG, showToast} from "../../utils/toasts";


const Input = styled('input')({
    display: 'none',
});


function TextField2(props) {
    console.log(props)
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
const KidPage = (props) => {

        const {data: session, status} = useSession({
            required: true,
            onUnauthenticated() {
                signIn()
            }
        })

        const token = session?.user?.access_token;

        function searchUser(props) {
            // console.log(props)
            // return [1,2,3]

        }

        const [userList, setUserList] = useState([]);
        const [filter, setFilter] = React.useState("");


        useEffect(() => {
            if (token)
                apiSearchUser(token, 20, filter)
                    .then(data => {
                        setUserList(data.users ? data.users : [])
                    })
                    .catch(e => {
                        showToast(ERROR_MSG, e.message)
                    })

        }, [token, filter])


        const formik = useFormik({
            initialValues: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                role: 'parent',
                parent_id: 0,
            },
            validationSchema: yup.object({
                first_name: yup.string().required("First Name is required"),
                last_name: yup.string().required("Last Name is required"),
                email: yup.string().email().required("Email is required"),
                password: yup.string().min(6).required("Password is required"),
                role: yup.string().required("Role is required"),
                parent_id: yup.number().integer("aaa").min(0).required("Parent is required")
            }),
            onSubmit: values => handleSubmit(values),
        })

        const handleSubmit = (values) => {
            console.log(values)
            // const data = new FormData(event.currentTarget);
            //     console.log({
            //         email: data.get('email'),
            //         password: data.get('password'),
            //     });
        };


        if (status == "loading") return <Loader/>

        return (

            <Container component="main" maxWidth="sm">
                <Paper sx={{p: 4}}>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
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

                        <label htmlFor="contained-button-file">
                            <Input accept={["image/png", "image/jpeg"]} id="contained-button-file" multiple type="file"/>
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Create user
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }
;


export default KidPage;
