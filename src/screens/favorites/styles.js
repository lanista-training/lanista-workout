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
    position: absolute;
    .title {
      flex: 1;
      text-align: left;
      font-weight: 900;
      font-size: 2em;
      padding: 1em 0 0.5em 0.5em;
      .total {
        border-color: white;
        color: white;
        float: right;
        margin-right: 1em;
        margin-top: 0px;
        font-weight: 200;
        letter-spacing: -1px;
      }
    }
    .current-filters {
      height: 3em;
      overflow-x: scroll;
      width: calc(100vw - 1em);
      display: flex;
      position: relative;
      z-index: 2;
      padding-left: 1em;
    }
    .MuiChip-root {
      color: white;
      border-color: white;
      margin-right: 1em;
      background: rgb(220,0,78);
      svg {
        color: white;
      }
    }
  }
  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
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
  }
  .empty-list-text {
    height: 100vh;
    background: whitesmoke;
    padding: 2em;
    margin-top: 1em;
    text-align: center;
  }
  .plan-exercise {
    width: calc(100vw - 48px);
    margin-left: auto;
    margin-right: auto;
    border-radius: 18px;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
  }
  .exercise-wrapper {
    background-color: whitesmoke;
  }
  .MuiAppBar-root.MuiPaper-root {
    background: white;
    box-shadow: none;
    padding-top: 1em;
    background-color: whitesmoke;
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
    color: #929090;
    font-weight: 100;
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
  .virtual-list-wrapper {
    ::before
    {
      display: table;
      content: '';
      width: 100%;
      height: 2em;
      position: absolute;
      background: whitesmoke;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      top: ${props => (props.paddingTop - 32) || "initial"}px;
    }
  }
  .exercise-wrapper {
    ::before
    {
      height: 0!important;
      content: '';
    }
  }
  .exercise-wrapper:last-child {
    ::after
    {
      display: table;
      content: '';
      width: 100%;
      height: 100vh;
      position: absolute;
      background: whitesmoke;
      top: 100%;
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
