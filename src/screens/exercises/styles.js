import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  background: rgb(220,0,78);
  .MuiLinearProgress-root {
    position: absolute;
    top: 0em;
    width: 100%;
    z-index: 2;
  }
  .header {
    align-items: left;
    display: flex;
    flex-flow: column;
    background: rgb(220, 0, 78);
    color: white;
    margin: 0 0 1.5em 0;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    padding: 1em;
    .title {
      flex: 1;
      text-align: left;
      font-weight: 900;
      font-size: 2em;
      padding: 0.5em 0;
    }
  }
  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: scroll;
    width: 100%;
    margin-top: 5em;
    ::before
    {
      display: table;
      content: '';
      width: 100%;
      height: 1.2em;
      position: absolute;
      background: whitesmoke;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
  }
  .list-wrapper {
    min-height: 100vh;
    background-color: whitesmoke;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;
    flex: 1 1 0%;
    padding: 2.5em 1.5em 1.5em;
    .empty-list-text {
      margin-top: calc(50vh - 140px);
      line-height: 1.5em;
      font-size: 1.2em;
      font-weight: 100;
      text-align: center;
      color: grey;
    }
  }
  .plan-exercise {
    margin-bottom: 2em;
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
  .exercise-images {
    display: flex;
    .start-image, .end-image {
      height: calc((100vw - 48px)/2);
      width: calc((100vw - 48px)/2);
      background-size: contain;
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
