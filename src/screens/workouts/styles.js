import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  background: white;
  display: flex;
  flex-flow: column;
  background: whitesmoke;
  .user-info {
    display: flex;
    padding: 1em;
    background: rgb(220, 0, 78);
    color: white;
    button {
      border-color: white;
      color: white;
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
    }
  }
  .content {
    flex: 1;
    padding: 0 1em;
    .MuiCardHeader-title {
      font-weight: 900;
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
`;

export const StyledCard = styled.div`
  width: 100%;
  margin: 1em 0;
`;
