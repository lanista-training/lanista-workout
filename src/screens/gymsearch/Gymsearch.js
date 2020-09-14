import * as React from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {Panel, StyledButton} from './styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({
  gyms,
  error,
  loading,
  onGoBack,
  filter,
  onFilterChange,
  onLinkGym,
  hasNorch,
  connectedDialogOpen,
  handleConnectedDialogClose,
}) => {
  const {t} = useTranslate("gymsearch");
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100)
  }, []);
  const [selectedGym, setSelectedGym] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <Panel>
      <div className="header" style={hasNorch ? {paddingTop: "30px"} : {}}>
        <div className="header-inner-frame">
          <div className="title">
            {t("your_data")}
          </div>
        </div>
      </div>
      <div className="content-wrapper" style={hasNorch ? {marginTop: "110px"} : {marginTop: "80px"}}>
        <div className="content">
          <div className="form-section">
          <Paper component="form">
            <InputBase
              placeholder={t("studio_trainer_search")}
              inputProps={{ 'aria-label': 'search google maps' }}
              value={filter}
              onChange={onFilterChange}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          </div>
          <div className="gyms-list">
            <div className="gyms-list-wrapper">
              <GridList cols={2}>
                {gyms && gyms.length == 0 &&
                  <div className="no-data"></div>
                }
                {
                  gyms && gyms.map(gym => (
                    <div className="gym-item" key={"gym-" + gym.id}>
                      <GridListTile>
                        <div className="gym-image" style={{backgroundImage: "url(" + gym.imageUrl + ")"}}/>
                        <div className="gym-name">{gym.name}</div>
                        <Button variant="contained" color="primary" onClick={() => {
                          setSelectedGym(gym.id)
                          setDialogOpen(true)
                        }}>
                          {t('connect')}
                        </Button>
                      </GridListTile>
                    </div>
                    ))
                  }
                }
              </GridList>
            </div>
          </div>
        </div>
      </div>
      <StyledButton color="primary" onClick={onGoBack}>
        <ArrowBackIosIcon style={{marginLeft: '0.4em'}}/>
      </StyledButton>


      {dialogOpen &&
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Verbinden</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('connect_hint')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              {t('back')}
            </Button>
            <Button onClick={() => {
              onLinkGym(selectedGym)
              handleDialogClose()
            }} color="primary" autoFocus>
              {t('connect')}
            </Button>
          </DialogActions>
        </Dialog>
      }


      {connectedDialogOpen &&
        <Dialog
          open={connectedDialogOpen}
          onClose={handleConnectedDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Verbinden</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('connected_hint')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConnectedDialogClose} color="primary" autoFocus>
              {t('back')}
            </Button>
          </DialogActions>
        </Dialog>
      }

    </Panel>
  )
};
