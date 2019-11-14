import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const StyledButton = styled(Fab)`
  position: fixed!important;
  bottom: 10px;
  left: 50%;
  margin-left: -28px!important;
  background-color: rgb(220,0,78)!important;
`;

export const Menu = styled.div`
  position: fixed;
  bottom: 1em;
  right: 1em;
  .MuiSpeedDial-fab {
    background-color: rgb(220,0,78)!important;
  }
`;
