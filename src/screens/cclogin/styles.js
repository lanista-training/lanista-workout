import styled from 'styled-components';

export const Panel = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
  top: 0;
  position: absolute;
  form {
    display: flex;
    flex-wrap: wrap;
    margin: 0 3em;
    justify-content: center;
    .textField {
      margin-left: 2em;
      margin-right: 2em;
      width: 200;
    }
    .login-message {
      text-align: center;
      padding-top: 1em;
      font-family: Roboto;
      font-weight: 100;
      font-size: 0.9em;
      span {
        color: #b41730;
      }
    }
    .login-button {
      width: 100%;
      margin-top: 2em;
      button {
        text-align: center;
      }
      .MuiCircularProgress-root {
        left: calc(50% - 15px)!important;
        top: 1px;
      }
    }
  }
  .logo-wrapper {
    margin-top: 2em;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .logo {
    height: 10em;
    width: 10em;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .request-password {
    text-align: center;
  }
  .MuiButton-root {
    background-color: #dc004e;
  }
  .MuiLink-root {
    color: #dc004e;
    margin-top: 2em;
  }
  .wellcome-message {
    font-family: Roboto;
    font-size: 2em;
    font-weight: 100;
    color: #afafaf;
  }
  .copyright {
    color: rgba(0, 0, 0, 0.54);
    text-align: center;
    font-size: 0.875rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    position: absolute;
    width: 100%;
    bottom: 1em;
  }
`;
