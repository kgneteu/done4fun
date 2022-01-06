import {Table, Tbody, Td, Th, Thead, Tr} from "react-super-responsive-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import {useConfirm} from "material-ui-confirm";
import {apiDeleteUser} from "../../utils/api";
import {ERROR_MSG, showToast, SUCCESS_MSG} from "../../utils/toasts";
import {useTranslation} from "next-i18next";
import Box from "@mui/material/Box";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import IconButton from "@mui/material/IconButton";


export const UserTable = ({users, pager}) => {
    const confirm = useConfirm();
    const {t} = useTranslation()

    function handleUserDelete(token, id) {
        confirm({description: t('This action is permanent!')})
            .then(() => {
                apiDeleteUser(id)
                    .then(() => showToast(SUCCESS_MSG, t("User has been deleted!")))
                    .catch(err => showToast(ERROR_MSG, err.message))
            })

    }

    return (
        <>
            <Table>
                <Thead>
                    <Tr>
                        <Th>{t("First Name")}</Th>
                        <Th>{t("Last Name")}</Th>
                        <Th>{t("Role")}</Th>
                        <Th>{t("E-Mail")}</Th>
                        <Th>{t("Actions")}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user.id}>
                            <Td>{user.first_name}</Td>
                            <Td>{user.last_name}</Td>
                            <Td>{user.role}</Td>
                            <Td>{user.email}</Td>
                            <Td>
                                <IconButton color="primary" aria-label="edit" size="medium">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete" size="medium"
                                            onClick={() => handleUserDelete(user.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton color={"secondary"} aria-label="send message" size="medium">
                                    <EditIcon/>
                                </IconButton>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Box sx={{py:1}}>
                {pager}
            </Box>
        </>
    )
};

UserTable.propTypes = {
    users: PropTypes.array,
    pager: PropTypes.node
};
