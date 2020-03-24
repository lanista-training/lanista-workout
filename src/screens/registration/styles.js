import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Stepper from '@material-ui/core/Stepper';
import Switch from '@material-ui/core/Switch';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-flow: column;
  background: rgb(220,0,78);
  overflow: hidden;
  .instructions-navigation-wrapper {
    flex: 1;
    display: flex;
    flex-flow: column;
    .instructions-navigation-section {
      flex: 1;
      display: flex;
      flex-flow: column;
      .instructions {
        flex: 1;
        display: flex;
      }
    }
  }
  .MuiStepLabel-label {
    font-size: 0.8em;
    font-weight: 100;
  }
  .content {
    flex: 1;
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    padding: 0.5em 1em 5em 1em;
    background-color: whitesmoke;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    .form-section {
      padding-top: 2em;
      text-align: center;
      .search-skip-button {
        margin-top: 2em;
      }
      .email-next-button {
        margin-top: 2em;
      }
    }
    .gyms-list {
      .gyms-list-title {
        margin-top: 2em;
        margin-bottom: 0.5em;
        color: grey;
      }
    }
    .gyms-list-wrapper {
      padding-bottom: 2em;
      margin-top: 2em!important;
      .MuiGridList-root {
        width: 100%;
        margin: 0!important;
        .gym-item {
          width: 48%!important;
          li {
            background: white;
            padding: 0.5em;
            height: 11.5em;
            border-style: solid;
            border-width: 1px;
            border-radius: 10px;
            border-color: #c3c3c3;
            .MuiGridListTile-tile {
              display: flex;
              flex-flow: column;
              justify-content: space-around;
              padding: 5px;
            }
            .gym-image {
              width: 90px;
              height: 90px;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
              margin-right: auto;
              margin-left: auto;
            }
            button {
              margin-bottom: 1em;
              margin-top: 1em;
            }
            .gym-name {
              text-align: center;
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

export const StyledStepper = styled(Stepper)`
  background-color: rgb(220,0,78)!important;
  .MuiStep-root {
    color: white;
    .MuiStepLabel-label {
      color: white;
    }
    .MuiStepIcon-completed {
      color: rgb(76, 175, 80);
    }
  }
`;

export const GymSearch = styled.div`
  flex: 1;
  background: rgb(220, 0, 78);
`;

export const EmailInputField = styled.div`
  background-color: white;
  flex: 1;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
`;

export const SendEmail = styled.div`
  background-color: white;
  flex: 1;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
  .sumary-section {
    text-align: justify;
    margin-bottom: 2em;
    padding: 1em;
    span {
      font-weight: 900;
      float: right;
    }
  }
  .circular-progress {
    position: absolute;
    margin-top: 4px;
    margin-left: -5em;
  }
`;

export const StyledTermsAndConditions = styled.div`
  background-color: white;
  .title {
    font-weight: 900;
    padding-top: 1em;
  }
  .section {
    padding-top: 1em;
    align: justify;
    margin-left: 0.2in;
    margin-bottom: 0in;
  }
  .content {
    padding-top: 1em;
  }
`;

export const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  font-size: 0.8em;
  flex-direction: row-reverse;
  margin-right: 1em;
  margin-bottom: 1em;
  display: none;
`;
