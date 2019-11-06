import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  background: white;
  display: flex;
  flex-flow: column;
  background: whitesmoke;
  padding-bottom: 3em;
  .header {
    display: flex;
    padding: 1em;
    background: rgb(220, 0, 78);
    color: white;
    font-weight: 900;
    font-size: 1.2em;
  }
  .content {
    min-height: 100vh;
    .MuiPaper-root {
      margin-bottom: 1em;
    }
    .MuiTab-textColorPrimary {
      color: rgb(255, 195, 216)!important;
    }
    .MuiTab-textColorPrimary.Mui-selected {
      color: white!important;
    }
    .MuiCardContent-root {
      font-family: Roboto;
      font-size: 1.3em;
      color: #adadad;
    }
    .MuiCardActions-root {
      display: flex;
      justify-content: space-between;
      font-family: Roboto;
      font-size: 1.3em;
      color: #adadad;
      span {
        font-size: 1.5em;
        font-weight: 900;
        color: black;
      }
    }
    .exercise-images {
      display: flex;
      .start-image, .end-image {
        height: calc((100vw - 48px)/2);
        width: calc((100vw - 48px)/2);
        background-size: contain;
      }
    }
  }
  .header {
    .workout-name {
      flex: 1;
      line-height: 2em;
    }
    button {
      color: white;
    }
  }
  header {
    background-color: rgb(220,0,78)!important;
    box-shadow: none;
  }
  .error {
    padding: 2em;
  }
  .exercise-list{
    .MuiBox-root {
      padding: 24px!important;
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
