import {Card, CardActionArea, CardActions, CardContent} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import Link from "../UI/Link";

const KidCard = ({user, onKidSelect}) => {
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name, size = '32px') {
        return {
            sx: {
                bgcolor: stringToColor(name),
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
