import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';

export const Panel = styled.div`
  font-family: Roboto;
  .exercise-header{
    padding: 1em;
    background-color: rgb(220,0,78)!important;
    display: flex;
    flex-flow: row;
    .exercise-name {
      flex: 1;
    }
    button {
      padding: 0 0 0 1em;
    }
  }
  .exercise-images{
    height: calc(100vw/2);
    background-position: right top, left top;
    background-repeat: no-repeat;
    background-size: 51% auto, 51% auto;
  }
  .exercise-title {
    font-size: 1.4em;
    font-weight: 900;
  }
  .exercise-content {
    color: #a5a5a5;
    padding-bottom: 2em;
  }
  .MuiListItem-root {
    text-align: right!important;
  }
  .create-protocoll-button {
    text-align: center;
    button {
      padding: 0;
      color: rgb(220,0,78)!important;
      svg {
        font-size: 1.5em;
      }
    }
  }
  .protocoll-date {
    width: 100%;
    margin-bottom: 1em;
  }
  .MuiListItem-root.selected {
    background: #777777!important;
    color: white!important;
    border-radius: 5px;
  }
  .MuiCircularProgress-root {
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-top: 40%;
  }
`;
export const StyledDialog = styled(Dialog)`
  .input-fields {
    display: flex;
    margin-bottom: 1em;
    .MuiTextField-root {
      flex: 1!important;
      width: 100%!important;
      margin-top: 1em!important;
    }
  }
`;
export const StyledButton = styled(Fab)`
  position: fixed!important;
  bottom: 10px;
  left: 50%;
  margin-left: -28px!important;
  background-color: rgb(220,0,78)!important;
`;
