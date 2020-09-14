import styled from 'styled-components';

export const GroupedButtons = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  position: fixed;
  bottom: 1em;
  left: 0;
  display: flex;
  z-index: 3;
  .group-section {
    background-color: rgb(220,0,78);
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    display: flex;
    button {
      background-color: rgb(220,0,78);
      box-shadow: none;
      border-radius: 0;
      color: white;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      svg {
        font-size: 2em;
      }
      :hover {
        background-color: rgb(220,0,78);
      }
    }
  }
  .group-border {
    background-color: rgb(220,0,78);
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    width: 67px;
    margin-left: -5em;
  }
`;
