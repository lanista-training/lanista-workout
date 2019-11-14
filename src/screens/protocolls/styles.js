import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-flow: column;
  background: whitesmoke;
  .header {
    align-items: center;
    display: flex;
    flex-flow: column;
    background: rgb(220, 0, 78);
    color: white;
    margin: 0 0 1.5em 0;
    font-weight: 900;
    font-size: 1.5em;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    .title {
      flex: 1;
      padding: 1em;
      text-align: right;
    }
    .MuiLinearProgress-root {
      width: 100%;
    }
  }
  .list-wrapper {
    background: whitesmoke;
    padding: 0 2em 2em 2em;
    .MuiExpansionPanel-root {
      background-color: white;
      border-bottom-style: solid;
      border-bottom-color: whitesmoke;
      border-bottom-width: 2px;
      .MuiExpansionPanelDetails-root {
        flex-flow: column;
        .protocoll-exercise {
          display: flex!important;
          flex-flow: row!important;
          margin: 1em 0;
          border-bottom-style: solid;
          border-bottom-width: 1px;
          border-bottom-color: #dedddd;
          padding-bottom: 1em;
          .protocolls {
            flex: 1;
            .protocoll {
              display: flex;
              flex-flow: row;
              span {
                font-size: 0.8em;
              }
              .training {
                flex: 1;
                text-align: left;
              }
              .weight {
                flex: 1;
                text-align: right;
                padding-right: 1em;
              }
            }
          }
          .images {
            flex: 1;
            height: 5em;
            display: flex;
            flex-flow: row;
            .start-image {
              flex: 1;
              background-size: cover;
            }
            .end-image {
              flex: 1;
              background-size: cover;
            }
          }
        }
      }
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
