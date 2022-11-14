import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({success}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        
    };

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                sx={{
                    width: "100px",
                    height: "50px",
                }}
                onClick={handleClickOpen}
            >
                Register
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you Sure you want to register a new gas provider?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(handleClose)}>cancle</Button>
                    <Button onClick={() => {
                        handleClose();
                        success();
                    }} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
