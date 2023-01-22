import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button"

import ImageAvatar from "../avatar"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#292b2a",
    color: "rgba(255, 255, 255, 0.7)",
    // backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none', //Remove background glow around modals
  },
}));

//TODO: This page should be linked to a database query
export default function ConcertModal(props) {
  const classes = useStyles();

  return (
    <div>
    <Modal
        // aria-labelledby="transition-modal-title"
        // aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={props.open}>
            <div className={classes.paper} style = {{textAlign : "center"}}>
                <ImageAvatar img = {props.img} /> 
                <h2 style = {{color: "#fff"}}>{props.title} - Concert Title</h2>
                <p><b>Venue:</b> Quodos Bank Arena</p>
                <p><b>Date:</b> 20 April, 2020</p>
                <p><b>Time:</b> 8pm</p>
                <p><b>Other Info:</b> Starring this artist and that artist and that artist all near you</p>
                <Button variant="contained" color= "primary">
                    Book Tickets
                </Button>
            </div>
        </Fade>
    </Modal>
    </div>
  );
}
