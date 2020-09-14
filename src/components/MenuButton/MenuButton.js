import * as React from "react";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Backdrop from '@material-ui/core/Backdrop';
import {StyledButton, Menu} from "./styles";
import { useTranslate } from '../../hooks/Translation';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhonelinkSetup from '@material-ui/icons/PhonelinkSetup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({onLogout, onGoToProtocolls, onGoToMeasurements, preventLogout, onGoToSetup, editable, language}) => {
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

  let {t, changeLanguage} = useTranslate("menu");
  console.log('CHANGING LANGUAGE TO')
  console.log(language)
  language && changeLanguage(language.toLowerCase());

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const actions = [];
  actions.push({
    icon: <Icon>history</Icon>,
    name: t('protocolls'),
    onClick: () => {
      handleClose()
      onGoToProtocolls()
    }
  })
  actions.push({
    icon: <Icon>straighten</Icon>,
    name: t('measures'),
    onClick: () => {
      handleClose()
      onGoToMeasurements()
    }
  })
  if(editable) {
    actions.push({
      icon: <Icon>settings_applications</Icon>,
      name: t('settings'),
      onClick: () => {
        handleClose()
        onGoToSetup()
      }
    })
  }
  if(!preventLogout) {
    actions.push(
    {
      icon: <Icon>exit_to_app</Icon>,
      name: t('logout'),
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
        ariaLabel={t("menu")}
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
        <DialogTitle id="alert-dialog-title">{t("leave")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('logout_warning')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>{
              handleClose()
              handleCloseDialog()
            }} color="primary"
          >
            {t("back")}
          </Button>
          <Button onClick={onLogout} color="primary" autoFocus>
            {t("logout")}
          </Button>
        </DialogActions>
      </Dialog>
    </Menu>
  )
}
