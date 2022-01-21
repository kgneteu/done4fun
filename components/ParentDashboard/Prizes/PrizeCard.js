import {Card, CardActions, CardContent} from "@mui/material";
import SVG from "../../SVG";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import {DynamicIcon} from "../Tasks/DynamicIcon";
import {stringToColor} from "../../../utils/form-tools";

export function PrizeCard({prize, onPrizeEdit, onPrizeDelete}) {
    return (
        <Card sx={{width: "180px"}}>
            {/*<SvgIcon color={'primary'} width={32} height={32} component={`/images/icons/prizes/${prize.icon}.svg`}/>*/}
            <DynamicIcon type={'prizes'} name={prize.icon} color={stringToColor(prize.name)}/>
            <img width={32} height={32} src={`/images/icons/prizes/${prize.icon}.svg`}/>
            <SVG width={32} height={32} src={`assets/icons/prizes/${prize.icon}.svg?url`}/>
            <CardContent>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {prize.name}
                </Typography>
            </CardContent>

            <CardActions disableSpacing={true}>
                <CasinoIcon color={"disabled"}/>{prize.points}
                <Box sx={{flexGrow: 1}}/>
                <IconButton onClick={onPrizeEdit} color={'primary'}>
                    <EditIcon/>
                </IconButton>

                <IconButton onClick={onPrizeDelete} color={'error'}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>);
}

PrizeCard.propTypes = {
    prize: PropTypes.any,
    onPrizeEdit: PropTypes.func,
    onPrizeDelete: PropTypes.func
};
