import * as React from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {getProviders} from "next-auth/react";
import {Checkbox, Container, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import * as yup from "yup";
import {formFieldProps} from "../../utils/form-tools";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {IconPicker} from "../../components/UI/IconPicker";
import {PrizeEditor} from "../../components/ParentDashboard/Prizes/PrizeEditor";

const TaskEditor = () => {
    const {t} = useTranslation();
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            action: '',
            points: '1',
            icon: '1',
        },
        validationSchema: yup.object({
            action: yup.string().required(),
            points: yup.number().min(1).max(1000).required(),
        }),
        onSubmit: values => handleSubmit(values),
    })
    return (
        <Container maxWidth={"sm"}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    {...formFieldProps(formik, "action", t("Action"))}
                    required
                    autoComplete="prize-name"
                    autoFocus
                />
                <TextField
                    {...formFieldProps(formik, "points", t("Points"))}
                    required
                    autoComplete="prize-points"
                />
                <IconPicker group={"tasks"}
                            {...formFieldProps(formik, "icon", t("Icon"))}
                />
                <FormGroup>
                    <FormControlLabel control={<Checkbox/>} label={t("One-time Prize")}/>
                </FormGroup>

                <DialogActions>
                    <Button>
                        Cancel
                    </Button>
                    <Button>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Container>
    )
};

function AdminPage() {
    return <>
        <PrizeEditor/>
        <TaskEditor/>
    </>
}

//
// AdminPage.getLayout = function getLayout(page) {
//     const drawer = (
//         <div>
//             <Toolbar/>
//             <Divider/>
//             <List>
//                 {[
//                     {
//                         label: 'Users',
//                         icon: <People/>
//                     },
//                     {
//                         label: 'Settings',
//                         icon: <Settings/>
//                     },
//                     {
//                         label: 'Logout',
//                         icon: <Logout/>
//                     }
//                 ].map((action, index) => (
//                     <ListItem button key={action.label}>
//                         <ListItemIcon>
//                             {action.icon}
//                         </ListItemIcon>
//                         <ListItemText primary={action.label}/>
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
//
//     return (
//         <AdminLayout drawer={drawer}>
//             {page}
//         </AdminLayout>
//     )
// }

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: {providers},
    }
}

export default AdminPage;
