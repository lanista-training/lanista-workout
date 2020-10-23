import styled from 'styled-components';

export const Chronometer  = styled.div`
overflow: hidden;
position: absolute;
z-index: 1;
  button {
    display: block;
    margin-left: auto;
  }
  .panel-wrapper {
    width: 100%;
    .display-numbers {
      text-align: center;
      font-size: 4em;
      font-weight: 100;
    }
    .buttons {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1em;
      button {
        margin: 0;
      }
    }
  }
  background-color: #ffffffeb;
  border: 1px solid rgba(0,0,0,.0975);
  border-radius: 15px;
  box-shadow: 0 0 27px 0 #0000001f;
  width: 20em;
  display: flex;
  flex-flow: column;
  align-items: center;
`;
