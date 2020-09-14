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
    font-size: 1.5em;
    .MuiPaper-root {
      width: 100%;
    }
    .MuiExpansionPanel-root {
      background: rgb(220,0,78);
      box-shadow: none;
      color: white;
      .MuiButtonBase-root {
        padding: 0;
        svg {
          color: white;
          margin-right: 0.3em;
          font-size: 1.5em;
        }
      }
    }
    .MuiExpansionPanelDetails-root {
      padding: 0;
      font-weight: 100;
      text-align: left;
      display: flex;
      flex-flow: column;
      button {
        margin-top: 2em;
        margin-bottom: 2em;
        border-color: white
      }
      .plan-author {
        line-height: 3em;
        span {
          font-size: 1.2em;
          font-weight: 900;
          float: right;
        }
      }
      .plan-duration {
        line-height: 3em;
        span {
          font-size: 1.2em;
          font-weight: 900;
          float: right;
        }
      }
    }
  }
  .content {
    min-height: 100vh;
    overflow: hidden;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    position: relative;
    margin-top: -20px;
    background-color: whitesmoke;
    header {
      overflow: hidden;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
    .plan-exercise {
      margin-bottom: 2em;
      border-radius: 10px;
      .MuiCardActions-root  {
        padding: 16px;
      }
    }
    .MuiAppBar-root.MuiPaper-root {
      background: white;
      box-shadow: none;
      padding-top: 1em;
      background-color: whitesmoke;
    }
    .MuiTabs-root {
      padding: 0.5em 1em;
      background-color: whitesmoke;
    }
    .MuiTab-textColorPrimary.Mui-selected {
      color: rgb(220,0,78);
    }
    .MuiTabs-indicator {
      background-color: rgb(220,0,78);
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
    .exercise-images.done {
      -webkit-filter: grayscale(100%);
      filter: grayscale(100%);
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
    padding-bottom: 1.2;
    .workout-name {
      flex: 1;
      line-height: 2em;
    }
    button {
      color: white;
    }
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
