import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import images from "../static/images/importImage";
import Typography from '@mui/material/Typography';

export default function ImageAvatars() {
    return (
        <Box
            sx={{
                marginLeft: "50px",
                marginRight: "50px",
                marginTop: "50px",
            }}
        >
            <Typography gutterBottom variant="h6" component="div">
              Gas Providers
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    "& > :not(style)": {
                        m: 3,
                        width: 150,
                        height: 150,
                    },
                }}
            >
                {images.map((item) => (
                    <Paper
                        elevation={3}
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "30%",
                        }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={item}
                            sx={{
                                width: "90%",
                                height: "90%",
                                borderRadius: "30%",
                            }}
                        />
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}
