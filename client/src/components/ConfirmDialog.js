import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core'
import { Button } from '@mui/material';


export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    

    return (
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle>
                
            </DialogTitle>
            <DialogContent >
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions >
                <Button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                    ยกเลิก
                </Button>
                <Button onClick={confirmDialog.onConfirm}>
                    ยืนยัน
                </Button>
            </DialogActions>
        </Dialog>
    )
}