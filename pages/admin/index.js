import * as React from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import {getProviders} from "next-auth/react";
import {
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import * as yup from "yup";
import {formFieldProps} from "../../utils/form-tools";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function IconPicker(props) {
    return (
        <FormControl sx={{m: 1, width: 300}}>
            <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                input={<OutlinedInput label={props.label}/>}
                MenuProps={MenuProps}

                renderValue={(selected) => (
                    <Image width={32} height={32} src={`/images/icons/${props.group}/${selected}.svg`}/>
                )}
            >
                {[...Array(63).keys()].map((index) => (
                    <IconButton key={index} value={index + 1}>
                        <Image width={32} height={32} src={`/images/icons/${props.group}/${index + 1}.svg`}/>
                    </IconButton>
                ))}
            </Select>
        </FormControl>
    )
}

const PrizeEditor = () => {
    const {t} = useTranslation();
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            points: '1',
            icon: '1'
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            points: yup.number().min(1).max(1000).required(),
            icon: yup.number(),
        }),
        onSubmit: values => handleSubmit(values),
    })
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
