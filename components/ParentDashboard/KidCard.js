import {Card, CardActionArea, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import Link from "../UI/Link";
import {stringToColor} from "../../utils/form-tools";

const KidCard = ({user, onKidSelect}) => {


    function stringAvatar(name, size = '32px') {
        return {
            sx: {
                backgroundColor: stringToColor(name),
                width: size,
                height: size,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Card sx={{maxWidth: 345, minWidth: 160}}>
            {/*<CardActionArea onClick={() => onKidSelect(user.id)}>*/}
            {/*<Link href={`/dashboard/kid/${user.id}`}>*/}
                <CardActionArea component={Link} href={`/dashboard/kid/${user.id}`}>
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    height="140"*/}
                {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}

                <CardContent>
                    <Avatar {...stringAvatar(user.first_name + ' ' + user.last_name, '80px')}/>
                    <Typography gutterBottom variant="h5" component="div">
                        {user.first_name}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary">*/}
                    {/*    Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                    {/*    species, ranging across all continents except Antarctica*/}
                    {/*</Typography>*/}
                </CardContent>
            </CardActionArea>
        {/*</Link>*/}
    <CardActions>
        <Button size="small" color="primary">
            View
        </Button>
    </CardActions>
</Card>
)
};

export default KidCard
