import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  background: ${props => props.theme.colors.primary};
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
    background: ${props => props.theme.colors.primary};
    color: white;
    margin: 0 0 1.5em 0;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    .title {
      flex: 1;
      text-align: left;
      font-weight: 900;
      font-size: 2em;
      padding: 1em 0 0.5em 0.5em;
      button {
        border-color: white;
        color: white;
        border-radius: 15px;
        float: right;
        margin-right: 2.5em;
        margin-top: 7px;
      }
    }
  }
  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: scroll;
    width: 100%;
    margin-top: 9em;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: whitesmoke;
    min-height: 100vh;
    .tab-panel {
      height: calc(100vh - 10em);
    }
    .MuiTabs-root {
      box-shadow: none;
      padding-top: 1em;
      background: whitesmoke;
      padding: 2em 0.5em 0em 0.5em;
      .MuiTab-wrapper {
        font-size: 0.8em;
        letter-spacing: 1px;
        font-weight: 100;
      }
    }
    .MuiTab-textColorPrimary.Mui-selected {
      color: ${props => props.theme.colors.primary};
    }
    .MuiTabs-indicator {
      background-color: ${props => props.theme.colors.primary};
    }
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
    .body-part-image {
      padding-top: 2em;
      svg {
        width: 95%;
        margin-right: auto;
        margin-left: auto;
        display: block;
      }
    }
  }
  .filters-list {
    padding-bottom: 5em;
    margin-top: 2em;
    .MuiSvgIcon-root {
      font-size: 2em;
      padding: 10px;
      margin-left: -17px;
      background: ${props => props.theme.colors.primary};
      color: white;
      border-radius: 50%;
    }
    .filter-lable {
      border-style: solid;
      border-width: 3px;
      border-color: ${props => props.theme.colors.primary};
      padding: 2px 5px;
      color: white;
      background: ${props => props.theme.colors.primary};
      border-radius: 15px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
      padding-right: 2em;
      padding-left: 2em;
      padding-top: 0;
      padding-bottom: 0;
      width: 65%;
      text-transform: uppercase;
      font-weight: 100;
      font-size: 14px;
    }
  }
  .current-filters {
    height: 3em;
    overflow-x: scroll;
    width: calc(100vw - 1em);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-left: 1em;
    .MuiChip-root {
      margin-right: 1em;
      margin-bottom: 1em;
      color: white;
      border-color: white;
    }
    .MuiSvgIcon-root {
      color: white;
    }
  }
  .search-field {
    padding: 2em;
    .MuiPaper-root {
      border-radius: 25px;
      display: flex;
      padding-right: 0.5em;
      padding-left: 1em;
      .MuiInputBase-root {
        flex: 1;
      }
      svg {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
  .text-search-hints {
    text-align: center;
    color: grey;
    font-weight: 100;
    padding: 2em 0 0 0;
    span {
      font-weight: 900;
      font-size: 1.5em
    }
  }
`;

export const StyledButton = styled(Fab)`
  position: fixed!important;
  bottom: 10px;
  left: 50%;
  margin-left: -28px!important;
  background-color: ${props => props.theme.colors.primary}!important;
  z-index: 999;
  color: white!important;
  font-size: 0.5em!important;
  svg {
    color: white!important;
  }
`;
