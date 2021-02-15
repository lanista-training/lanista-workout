import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import moment from "moment";
import { useTranslate } from '../../hooks/Translation';
import {StyledPanel} from './styles';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import PhoneIcon from '@material-ui/icons/Phone';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '../../components/LanistaButton';

function Panel(props) {
  const {modal, scanning} = props
  return (
    <StyledPanel>
      { scanning && <LinearProgress /> }
      { modal && <div className="modal-blocker"/> }
      {props.children}
    </StyledPanel>
  )
}

const ContactRequest = ({

  firstName,
  lastName,
  language,
  logoUrl,

  hasNorch,

  refetch,
  loading,

  onContactRequest,
  sending,
  messageSent,
  errorOnSend,

}) => {

  const {t} = useTranslate("contactrequest");

  const [date, changeDate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');

  const onSendButtonClick = (event) => {
    onContactRequest(date, phoneNumber, comment)
  }

  return (
    <Panel>
      <div className="user-info header" style={hasNorch ? {top: "30px"} : {}}>
        <div className="header-inner-frame">
          <div className="user-name">
            <div className="first">{loading ? <Skeleton width="60%" /> : firstName}</div>
            <div className="last">{loading ? <Skeleton width="50%" /> : lastName}</div>
          </div>
          <div className="gmy-logo" style={{backgroundImage: 'url(' + logoUrl + ')'}}></div>
        </div>
      </div>
      <div className="content-wrapper" style={{marginTop: (loading) ? (hasNorch ? "calc(45vw + 135px)" : "calc(45vw + 115px)"): "110px"}}>
        <div className="content">
          <div className="form">
            { !messageSent &&
              <>
                <div className="content-title">{t("select a day")}</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    variant="inline"
                    clearable
                    value={date}
                    label={t("wich day and time")}
                    onChange={changeDate}
                    minDate={new Date()}
                    disablePast
                    format="dd/MM/yyyy HH:mm"
                    ampm={false}
                    autoOk
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  id="call-back-number"
                  label={t("call back")}
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  InputProps={{endAdornment: <InputAdornment position="end"><PhoneIcon/></InputAdornment>}}
                />
                <TextField
                  id="comment"
                  label={t("comment")}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <div className="button-section">
                  <Button onClick={onSendButtonClick} loading={sending} disabled={date === null}>
                    {t("send invitation")}
                  </Button>
                </div>
              </>
            }
            { messageSent &&
              <>
                <div className="content-title">{t("message sent")}</div>
                <div className="success-message">{t("wait for confirmation")}</div>
              </>
            }
          </div>
        </div>
      </div>
    </Panel>
  )
};

export default ContactRequest;
