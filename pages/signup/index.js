import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Link from "../../components/UI/Link";
import {useFormik} from "formik";
import * as yup from "yup";
import {formFieldProps} from "../../utils/form-tools";

const RegisterPage = (props) => {
    return (
        <SignUp/>
    );
};


const theme = createTheme();

function SignUp() {
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            first_name:yup.string().required(),
            last_name:yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(6),
        }),
        onSubmit: values => handleSubmit(values),
    })

    const handleSubmit = (values) => {
        // const data = new FormData(event.currentTarget);

    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
     };

    return (

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...formFieldProps(formik,"first_name","First Name")}
                                    autoComplete="given-name"
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...formFieldProps(formik,"last_name","Last Name")}
                                    required
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...formFieldProps(formik,"email","Email Address")}
                                    required
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...formFieldProps(formik,"password","Password")}
                                    required
                                    type="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>

                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
    );
}

export default RegisterPage;
