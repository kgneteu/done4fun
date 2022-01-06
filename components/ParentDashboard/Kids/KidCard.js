import {Card, CardActionArea, CardActions, CardContent, Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "../../UI/Link";
import {stringAvatar, stringToColor} from "../../../utils/form-tools";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";




const KidCard = ({user, onKidEdit, onKidDelete}) => {
    return (
        <Card sx={{maxWidth: 345, minWidth: 160}}>
            <CardActionArea component={Link} href={`/dashboard/kid/${user.id}`}>
                <CardContent>
                    <Grid container direction={"column"} alignItems={"center"}>
                        <Avatar {...stringAvatar(user.first_name + ' ' + user.last_name, '80px')}/>
                        <Typography gutterBottom variant="h5" component="div">
                            {user.first_name}
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing={true}>
                <IconButton onClick={onKidEdit} color={'primary'} component={Link} href={`/dashboard/kid/${user.id}`}>

                    <MoreHorizIcon/>
                </IconButton>
                <Box sx={{flexGrow: 1}}/>
                <IconButton onClick={onKidEdit} color={'primary'}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={onKidDelete} color={'error'}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default KidCard
