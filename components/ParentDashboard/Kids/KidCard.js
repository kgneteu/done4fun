import {Card, CardActionArea, CardActions, CardContent, Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "../../UI/Link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Image from 'next/image'
import {stringAvatar} from "../../../utils/form-tools";
import {RoundButton} from "../Tasks/RoundButton";

const UserAvatar = ({user, size}) => {
        //todo better avatar in cicrle
    if (user.picture) {
        return (
            //<Avatar sx={{width: size, height: size}} src={`/api/file/private/images/avatar/${user.picture}`} />
            // <Box sx={{
            //     width: size,
            //     height: size,
            //     position: "relative",
            //     borderRadius: "50%",
            //     overflow: "hidden",
            //     border: "1px solid #cccccc"
            // }}>
            <Avatar  sx={{width: size, height: size}}>
                <Image src={`/api/file/private/images/avatar/${user.picture}`} height={size} width={size}
                       layout={'fill'} objectFit={'cover'}/>
            </Avatar>

        )
    } else {
        return <Avatar {...stringAvatar(user.first_name, user.last_name, size)}/>
    }
};

UserAvatar.propTypes = {};

const KidCard = ({user, onKidEdit, onKidDelete}) => {
    return (
        <Card sx={{maxWidth: 345, minWidth: 180}}>
            <CardActionArea component={Link} href={`/dashboard/kid/${user.id}`}>
                <CardContent>
                    <Grid container direction={"column"} alignItems={"center"}>
                        <UserAvatar user={user} size={80}/>

                        <Typography gutterBottom variant="h5" component="div">
                            {user.first_name}
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing={true}>
                <IconButton onClick={onKidEdit} color={'primary'} component={Link}
                            href={`/dashboard/kid/${user.id}`}>

                    <MoreHorizIcon/>
                </IconButton>
                <Box sx={{flexGrow: 1}}/>
                <RoundButton onClick={onKidEdit} color={'primary'} size={'small'}>
                    <EditIcon/>
                </RoundButton>
                <RoundButton onClick={onKidDelete} color={'error'} size={'small'} sx={{ml:1}}>
                    <DeleteIcon/>
                </RoundButton>
            </CardActions>
        </Card>
    )
};

export default KidCard
