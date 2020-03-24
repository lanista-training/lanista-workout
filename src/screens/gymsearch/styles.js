import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-flow: column;
  background: rgb(220,0,78);
  overflow: hidden;
  .header {
    background: rgb(220, 0, 78);
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
    top: 0;
    left: 0;
    overflow: scroll;
    width: 100%;
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
        .date-picker {
          width: 100%;
        }
        .gender-field {
          width: 100%;
          margin-top: 1em;
          text-align: left;
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
              .gym-name {
                text-align: center;
              }
            }
          }
        }
      }
    }
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
  margin-left: -28px!important;
  background-color: rgb(220,0,78)!important;
`;

export const StyledCard = styled.div`
  width: 100%;
  margin: 1.5em 0;
  box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
  border-radius: 10px!important;
  overflow: hidden;
`;
