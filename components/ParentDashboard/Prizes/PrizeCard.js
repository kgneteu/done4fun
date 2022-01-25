import {Card, CardActions, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import * as PropTypes from "prop-types";
import {DynamicIcon} from "../../UI/DynamicIcon";
import {stringToColor} from "../../../utils/form-tools";
import {RoundButton} from "../../UI/RoundButton";
import {useToken} from "../../../hooks/useToken";
import {useTranslation} from "next-i18next";
import {Loader} from "../../UI/Loader";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";

export function PrizeCard({prize, onPrizeEdit, onPrizeDelete,onPrizeGet}) {
    const [token, _, user] = useToken()
    const {t} = useTranslation()
    if (!token) return <Loader/>
    let buttons = null;
    if (user.role == "kid") {
        buttons = (
            <>
                <RoundButton title={t("Get this prize")}
                             disabled={user.points<prize.points}
                             size="small" onClick={onPrizeGet} color={'primary'}>
                    <CheckIcon/>
                </RoundButton>
            </>
        )
    } else {
        buttons = (
            <>
                <RoundButton title={t("Edit prize")}
                             onClick={onPrizeEdit} color={'primary'} size={'small'}>
                    <EditIcon/>
                </RoundButton>

                <RoundButton title={t("Delete prize")}
                             onClick={onPrizeDelete} color={'error'} sx={{ml: 1}} size={'small'}>
                    <DeleteIcon/>
                </RoundButton>

            </>
        )
    }
    return (
        <Card sx={{width: "240px"}}>
            <CardContent>
                <DynamicIcon type={'prizes'} name={prize.icon} color={stringToColor(prize.name)}/>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {prize.name}
                </Typography>
            </CardContent>

            <CardActions disableSpacing={true}>
                <CasinoIcon color={"disabled"}/>{prize.points}
                <Box sx={{flexGrow: 1}}/>
                {buttons}
            </CardActions>
        </Card>);
}

PrizeCard.propTypes = {
    prize: PropTypes.any,
    onPrizeEdit: PropTypes.func,
    onPrizeDelete: PropTypes.func
};
