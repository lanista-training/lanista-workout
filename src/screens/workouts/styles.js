import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  background: rgb(220,0,78);
  .header {
    background: rgb(220,0,78);
    color: white;
    flex: 1;
    position: fixed;
    width: 100vw;
    left: 0;
    .header-inner-frame {
      align-items: center;
      display: flex;
      padding: 1em;
      .header-title {
        flex: 1;
        text-align: left;
        font-weight: 900;
        font-size: 2em;
      }
      button {
        color: white;
        border-color: white;
      }
    }
  }
  .content-wrapper {
    position: relative;
    width: 100%;
    background: rgb(220,0,78);
    overflow: initial;
    position: relative;
    margin-top: 80px;
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
  .content {
    flex: 1;
    min-height: 100vh;
    padding: 0.5em 1em 5em 1em;
    background-color: whitesmoke;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    .header-section {
      display: flex;
      .plan-image {
        float: right;
        width: 5em;
        height: 5em;
        position: relative;
        right: 1em;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      .MuiCardHeader-root {
        flex: 1;
      }
    }
    .MuiCardActions-root {
      display: block!important;
      margin-right: auto!important;
      margin-left: auto!important;
      text-align: center!important;
      button {
        flex: 1;
        width: 90%;
        margin-bottom: 1em;
        border-color: rgb(220,0,78);
        color: rgb(220,0,78);
      }
    }
    .MuiCardHeader-title {
      font-weight: 900;
      line-height: 0.9em;
    }
    .active {
      .MuiAvatar-root {
        background: #4caf50!important;
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
  z-index: 2;
`;

export const StyledCard = styled.div`
  width: 100%;
  margin: 2em 0;
  border-radius: 10px;
  box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12);
  .MuiPaper-root {
    border-radius: 10px!important;
    padding: 2em 1em;
  }
`;
