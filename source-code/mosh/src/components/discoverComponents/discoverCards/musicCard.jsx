import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

import {fire} from "../../../config/fire"

let textTheme = createMuiTheme();
textTheme = responsiveFontSizes(textTheme);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '2%',
    flexGrow: 1,
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: 0
  },
  cover: {
    minWidth: 62,
    width: "20%",
    maxWidth : 151
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function MusicCard(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [share, setShare] = React.useState(false);



  const handleClickShare = () => {
    setShare(true);
  };

  const handleCloseShare = () => {

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenLink = () => {
    setShare(false);
  };

  const handleShare = (spotifyId, targetId) => {
    let db = fire.firestore();

    db.collection("shares").add({
      reciever: targetId,
      sender: fire.auth().currentUser.uid,
      spotifyID: spotifyId, 
    }).catch(err => {
      alert(err);
    })
  }

  return (
    <>
    <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image = {props.img}
            title="Album Art"
          style={{width: "150px", height:"150px"}}
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <ThemeProvider theme={textTheme}>
                  <Typography variant="h6" style={{width: "300px", whiteSpace: "nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>
                      <b> {props.title} </b>
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                      <b> Artist </b> : {props.artist}
                  </Typography>
                  {props.album ?
                  <Typography variant="subtitle2" color="textSecondary">
                      <b> Album </b> : {props.album}
                  </Typography>
                  :
                  <div></div>
                  }
                </ThemeProvider>
            </CardContent>
            <div style = {{display: 'flex', justifyContent: "flex-end", alignItems : "flex-start"}}>
              <IconButton aria-label="play/pause" style = {{paddingTop: 0}} onClick={handleClickOpen}>
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
              <IconButton aria-label="play/pause" style = {{paddingTop: 0}} onClick={handleClickShare}>
                <ShareIcon className={classes.playIcon} />
              </IconButton>
            </div>
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <iframe width="600" height="500" src={"https://embed.odesli.co/?url="+ props.link + "&theme=dark"}frameBorder="0" allowtransparency="true" allowFullScreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe>
      </Dialog>

      <Dialog
        open={share}
        onClose={handleCloseShare}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Share this song with your mates!"}</DialogTitle>
        <DialogContent>
          {props.connections.map((user) =>
                <Button onClick={() => {
                  handleShare(props.id, user.uid)
                }}>
                  {user.displayName}
                </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenLink} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
    </>
  );    
}
