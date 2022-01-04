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
import {useFormik} from "formik";
import * as yup from 'yup'
import {formFieldProps} from "../../utils/form-tools";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../utils/toasts";
import Link from "../../components/UI/Link";
import {getProviders, getSession, signIn} from "next-auth/react"
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {Paper} from "@mui/material";


const LoginPage = ({providers}) => {
    return (
        <SignIn providers={providers}/>
    );
};

function SignIn({providers}) {
    const {t} = useTranslation();
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(6),
        }),
        onSubmit: values => handleSubmit(values),
    })
    const handleSubmit = (values) => {
        signIn('credentials', {email: values.email, password: values.password, redirect: false})
            .then(res => {
                if (res.ok) {
                    getSession().then(s => {
                        if (s?.user?.access_token) {
                            showToast(SUCCESS_MSG, t("You've been logged in."))

                            const url = new URL(res.url)
                            const params = new URLSearchParams(url.search)
                            const callback = params.get('callbackUrl')
                            if (callback) {
                                const callbackUrl = new URL(callback)
                                if (callbackUrl.pathname !== router.pathname) {
                                    router.replace(callback)
                                }
                            }
                            router.replace('/dashboard')
                        } else {
                            showToast(ERROR_MSG, t("Unknown error. Please try again!"))
                        }
                    })
                } else {
                    showToast(ERROR_MSG, t("Wrong email or password!"))
                }
            })
            .catch(err => {
                showToast(ERROR_MSG, err.message)
            })

    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{p: 3, marginTop: 8,}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            {...formFieldProps(formik, "email", "Email Address")}
                            required
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            {...formFieldProps(formik, "password", "Password")}
                            required
                            type="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label={t("Remember me")}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    {Object.values(providers).map((provider) => (

                        <div key={provider.name}>
                            <button onClick={() => signIn(provider.id)}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </Box>
            </Paper>
        </Container>
    );
}

export async function getServerSideProps({locale}) {
    const providers = await getProviders()
    return {
        props: {providers, ...(await serverSideTranslations(locale, ['common']))},
    }
}

export default LoginPage;
