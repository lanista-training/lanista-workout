import styled from 'styled-components';

export const Panel = styled.div`
  background: white;
  height: 100vh;
  width: 100%;
  top: 0;
  position: absolute;
  main {
    display: flex;
    flex-flow: column;
    height: 100%;
    .footer-section {
      margin-bottom: 1em;
    }
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
  }
  .wellcome-message {
    font-size: 2em;
    font-weight: 100;
    color: #afafaf;
  }
`;
