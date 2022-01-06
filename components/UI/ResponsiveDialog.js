import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';

export default function ResponsiveDialog({open, onClose, title = null, children}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="dialog-title"
            >
                {title &&
                <DialogTitle id="dialog-title">
                    {title}
                </DialogTitle>}
                {children}
            </Dialog>
        </div>
    );
}

