import React, { useState, useEffect } from 'react'
import {Panel} from './styles'
import CircularProgress from '@material-ui/core/CircularProgress';

 export default ({loading, loginError}) => {
   return (
     <Panel>
       <div className="logo-wrapper" style={{flex: 1}}>
         <div className="logo" style={{backgroundImage:"url(https://lanista-training.com/bus/maccentercom/logo.png)"}} />
       </div>
       {
         loading &&
         <div className="loading-area">
           <div className="loading-text">Authenticating...</div>
           <CircularProgress size="10em"/>
         </div>
       }
       {
         loginError &&
         <div className="error-area">
           Es gabt ein Problem mit deiner Authentifizierung.
         </div>
       }
     </Panel>
  )
}
