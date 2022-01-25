import {Table, Tbody, Td, Th, Thead, Tr} from "react-super-responsive-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import IconButton from "@mui/material/IconButton";
import {Paper} from "@mui/material";
import {useTranslation} from "next-i18next";
import {RoundButton} from "../UI/RoundButton";


export const UserTable = ({users, pager, onUserDelete, onUserEdit, adminId}) => {
    const {t} = useTranslation()
    return (
        <>

            <Paper>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>{t("Name")}</Th>
                            <Th>{t("Role")}</Th>
                            <Th>{t("E-Mail")}</Th>
                            <Th>{t("Actions")}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map(user => (
                            <Tr key={user.id}>
                                <Td>{user.first_name + ' ' + user.last_name}</Td>
                                <Td>{user.role}</Td>
                                <Td>{user.email}</Td>
                                <Td align={"right"}>
                                    <RoundButton color="primary" aria-label="edit" size="small"
                                                onClick={() => onUserEdit(user.id)}>
                                        <EditIcon/>
                                    </RoundButton>
                                    {user.id != adminId &&
                                    <RoundButton color="error"
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => onUserDelete(user.id)}
                                                sx={{ml:1}}
                                    >
                                        <DeleteIcon/>
                                    </RoundButton>
                                    }
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Paper>
            <Box sx={{py: 1}}>
                {pager}
            </Box>
        </>
    )
};

UserTable.propTypes = {
    users: PropTypes.array,
    pager: PropTypes.node
};
