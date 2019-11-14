import styled from 'styled-components';

export const Panel = styled.div`
  background: white;
  height: 100vh;
  width: 100vw;
  top: 0;
  position: absolute;
  .logo-wrapper {
    margin-top: 10vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    .logo {
      height: 10em;
      width: 10em;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .loading-area {
    text-align: center;
    margin-top: 10vh;
    .loading-text {
      position: relative;
      width: 100%;
      top: 5em;
      line-height: 0em;
      font-family: Roboto;
      font-weight: 100;
      color: grey;
    }
    .MuiCircularProgress-root {
      color: #b41730!important;
    }
  }
  .error-area {
    text-align: center;
    margin-top: 10vh;
    font-family: Roboto;
    font-weight: 900;
    padding: 1em;
  }
`;
