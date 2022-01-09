import {useRouter} from "next/router";
import {FormGroup, ToggleButton} from "@mui/material";

const getWeekDays = locale => {
    const baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString(locale, {weekday: 'short'}).substr(0, 2));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
};

export function DaySelect({mode = 0, name, value, onChange}) {
    const router = useRouter();

    const updateValue = item => {
        const newValue = value ^ (2 ** item);
        if (onChange) onChange(newValue)
    };

    return (
        <FormGroup row>
            {[...Array(mode == 0 ? 7 : 31).keys()].map(item => (
                <ToggleButton
                    key={item + 1}
                    value={item + 1}
                    selected={value & (2 ** item)}
                    onChange={() => {
                        updateValue(item);
                    }}
                    sx={{width: "3rem"}}
                >
                    {mode == 0 ? getWeekDays(router.locale)[item] : item + 1}
                </ToggleButton>
            ))}
        </FormGroup>
    )
}
