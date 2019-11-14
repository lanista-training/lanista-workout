import * as React from "react";
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Backdrop from '@material-ui/core/Backdrop';
import {StyledButton, Menu} from "./styles";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({onLogout, onGoToProtocolls, preventLogout}) => {
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const handleVisibility = () => {
    setHidden(prevHidden => !prevHidden);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const actions = [];
  actions.push({
    icon: <HistoryIcon />,
    name: 'Protokolle',
    onClick: () => {
      handleClose()
      onGoToProtocolls()
    }
  })
  if(!preventLogout) {
    actions.push(
    {
      icon: <ExitToAppIcon />,
      name: 'Abmelden',
      onClick: () => {
        handleOpenDialog()
      }
    })
  }

  return (
    <Menu>
      <Button onClick={handleVisibility}> </Button>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Menü"
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<CloseIcon />} icon={<MoreVertIcon />}/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            tooltipOpen
          />
        ))}
      </SpeedDial>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"App verlassen"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Möchtest du die Lanista verlassen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{
              handleClose()
              handleCloseDialog()
            }} color="primary"
          >
            Zurück
          </Button>
          <Button onClick={onLogout} color="primary" autoFocus>
            Abmelden
          </Button>
        </DialogActions>
      </Dialog>
    </Menu>
  )
}
