import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-flow: column;
  background: ${props => props.theme.colors.primary};
  overflow: hidden;
  .header {
    background: ${props => props.theme.colors.primary};
    color: white;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    .header-inner-frame {
      align-items: center;
      display: flex;
      padding: 1em;
      .title {
        font-weight: 900;
        font-size: 2em;
      }
    }
  }
  .content-wrapper {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    overflow: scroll;
    width: 100%;
    .content {
      flex: 1;
      display: flex;
      flex-flow: column;
      min-height: 100vh;
      padding: 0.5em 1em 8em 1em;
      background-color: whitesmoke;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
      .form-section {
        padding-top: 2em;
        text-align: center;
        .date-picker {
          width: 100%;
        }
        .gender-field {
          width: 100%;
          margin-top: 1em;
          text-align: left;
        }
      }
      .setup-section {
        border-style: solid;
        border-width: 1px;
        border-radius: 15px;
        border-color: #c7c7c7;
        margin-top: 4em;
        padding: 1em;
        .setup-title {
          margin-bottom: 0.5em;
          color: grey;
        }
      }
      .gyms-list-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        overflow: hidden;
        .MuiGridList-root {
          flex-wrap: nowrap;
          display: flex;
          justify-content: center;
          width: 100%;
          .gym-item {
            margin-right: 0.5em;
            li {
              padding: 0.5em;
              min-width: 9em;
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
              .gym-name {
                text-align: center;
              }
            }
          }
        }
      }
      .logout-button {
        background-color: ${props => props.theme.colors.primary};
        margin-top: 2em;
        color: white!important;
        width: 100%;
      }
      .logout-button.Mui-disabled {
        background-color: #c5c3c3;
      }
    }
  }
  .invitations-list {
    .invitations-root {
      display: flex;
      border-radius: 10px;
    }
    .invitations-details {
      display: flex;
      flex-direction: column;
    }
    .invitations-content {
      flex: 1 0 auto;
    }
    .invitations-cover {
      width: 151px;
      background-size: contain;
    }
    .invitations-controls {
      display: flex;
      align-items: center;
      padding-left: 1em;
      padding-bottom: 1em;
    }
    .MuiTypography-subtitle1 {
      line-height: 1em;
    }
  }
  .version-section {
    margin-top: 3em;
    font-size: 0.8em;
    text-align: center;
    color: #a0a0a0;
  }
`;

export const UserAvatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: 1em;
  .avatar-photo {
    background-color: #fafafa;
    box-sizing: border-box;
    display: block;
    flex: 0 0 auto;
    overflow: hidden;
    position: relative;
    background-size: cover;
    height: 100%;
  }
`;

export const StyledButton = styled(Fab)`
  position: fixed!important;
  bottom: 10px;
  left: 50%;
  z-index: 3;
  margin-left: -28px!important;
  background-color: ${props => props.theme.colors.primary}!important;
`;

export const StyledCard = styled.div`
  width: 100%;
  margin: 1.5em 0;
  box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
  border-radius: 10px!important;
  overflow: hidden;
`;
