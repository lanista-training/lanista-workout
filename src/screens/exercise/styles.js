import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import InputNumber from './NumberInputField/NcInputNumber';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  .exercise-header{
    padding: 1em;
    display: flex;
    flex-flow: row;
    position: absolute;
    background: transparent;
    box-shadow: none;
    .exercise-name {
      flex: 1;
      text-shadow: 0px 0px 10px rgb(0, 0, 0);
      font-size: 1.2em;
      padding: 1em 0;
      font-weight: 100;
    }
    button {
      text-shadow: 0px 0px 10px rgb(0, 0, 0);
      position: relative;
      top: -10px;
      right: -10px;
      .MuiIcon-root {
        font-size: 1.3em;
      }
    }
  }
  .content {
    min-height: calc(100vh - 100vw + 20px);
    overflow: hidden;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    position: relative;
    margin-top: -20px;
    background-color: whitesmoke;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    header {
      overflow: hidden;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
    .MuiAppBar-root {
      background: white;
      box-shadow: none;
      padding-top: 1em;
      background-color: whitesmoke;
    }
    .MuiTabs-root {
      padding: 0.5em 1em;
      background-color: whitesmoke;
    }
    .MuiTab-textColorPrimary.Mui-selected {
      color: rgb(220,0,78);
    }
    .MuiTabs-indicator {
      background-color: rgb(220,0,78);
    }
  }
  .start-position {
    .slick-prev {
      display: none!important;
    }
  }
  .end-position {
    .slick-next {
      display: none!important;
    }
  }
  .slick-next {
    position: absolute;
    right: 0;
    margin-top: -1em;
    top: calc(100vw / 2);
    color: white;
    text-shadow: 0px 0px 10px rgb(0,0,0);
    font-size: 2em;
    padding: 10px;
  }
  .slick-prev {
    position: absolute;
    left: 10px;
    margin-top: -1em;
    top: calc(100vw / 2);
    color: white;
    z-index: 2;
    text-shadow: 0px 0px 10px rgb(0,0,0);
    font-size: 2em;
    padding: 10px;
  }
  .exercise-images{
    height: 100vw;
    background-position: right top, left top;
    background-repeat: no-repeat;
    background-size: 51% auto, 51% auto;
  }
  .exercise-image {
    height: 100vw;
    background-size: cover;
  }
  .exercise-indications {
    margin-top: 0.5em;
  }
  .exercise-title {
    font-size: 1.4em;
    font-weight: 900;
  }
  .exercise-content {
    color: #a5a5a5;
    padding-bottom: 2em;
  }
  .MuiListItem-root {
    text-align: right!important;
  }
  .protocoll-date {
    width: 100%;
    margin-bottom: 1em;
  }
  .MuiListItem-root.selected {
    background: #777777!important;
    color: white!important;
    border-radius: 5px;
  }
  .MuiCircularProgress-root {
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-top: 40%;
  }
  .tab-panel {
    padding-bottom: 4em;
  }
  .graphic{
    background: rgb(206, 41, 51);
    height: 90vw;
    margin: 0 1.5em;
    border-radius: 20px;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    overflow: hidden;
    display: flex;
    flex-flow: column;
    .no-data {
      padding: 4em 2em;
      color: white;
      text-align: center;
    }
    .graphic-header{
      color: white;
      padding: 1em 1em 0 1em;
      font-weight: 100;
      font-weight: 100;
      display: flex;
      .text-section {
        flex: 1;
        .last-value {
          font-size: 1.5em;
          font-weight: 900;
        }
      }
      .icon-section {
        ::after {
          font-family: Lanista;
          content: "\\e902";
          float: left;
          height: 0px;
          font-size: 3em;
          position: relative;
        }
      }
    }
  }
  .graphic-one-repetition {
    margin-top: 2em;
  }
  /* Slider */
  .slick-slider
  {
      position: relative;

      display: block;
      box-sizing: border-box;

      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;

      -webkit-touch-callout: none;
      -khtml-user-select: none;
      -ms-touch-action: pan-y;
          touch-action: pan-y;
      -webkit-tap-highlight-color: transparent;
  }

  .slick-list
  {
      position: relative;

      display: block;
      overflow: hidden;

      margin: 0;
      padding: 0;
  }
  .slick-list:focus
  {
      outline: none;
  }
  .slick-list.dragging
  {
      cursor: pointer;
      cursor: hand;
  }

  .slick-slider .slick-track,
  .slick-slider .slick-list
  {
      -webkit-transform: translate3d(0, 0, 0);
         -moz-transform: translate3d(0, 0, 0);
          -ms-transform: translate3d(0, 0, 0);
           -o-transform: translate3d(0, 0, 0);
              transform: translate3d(0, 0, 0);
  }

  .slick-track
  {
      position: relative;
      top: 0;
      left: 0;

      display: block;
      margin-left: auto;
      margin-right: auto;
  }
  .slick-track:before,
  .slick-track:after
  {
      display: table;

      content: '';
  }
  .slick-track:after
  {
      clear: both;
  }
  .slick-loading .slick-track
  {
      visibility: hidden;
  }

  .slick-slide
  {
      display: none;
      float: left;

      height: 100%;
      min-height: 1px;
  }
  [dir='rtl'] .slick-slide
  {
      float: right;
  }
  .slick-slide img
  {
      display: block;
  }
  .slick-slide.slick-loading img
  {
      display: none;
  }
  .slick-slide.dragging img
  {
      pointer-events: none;
  }
  .slick-initialized .slick-slide
  {
      display: block;
  }
  .slick-loading .slick-slide
  {
      visibility: hidden;
  }
  .slick-vertical .slick-slide
  {
      display: block;

      height: auto;

      border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
      display: none;
  }
  .protocolls .MuiList-root {
    padding-top: 2em
    .MuiListSubheader-root {
      font-size: 1.2em;
      font-weight: 900;
    }
    .MuiListItem-gutters {
      padding-top: 0;
      padding-bottom: 0;
    }
    .selected.MuiListItem-gutters {
      padding-top: 8px!important;
      padding-bottom: 8px!important;
    }
  }
`;
export const StyledDialog = styled(Dialog)`
  .fields-group {
    display: flex;
    flex-flow: row;
    .MuiFormControl-root {
      flex: 1;
    }
  }
`;
export const StyledButton = styled(Fab)`
  position: fixed!important;
  bottom: 10px;
  left: 50%;
  margin-left: -28px!important;
  background-color: rgb(220,0,78)!important;
  z-index: 999;
`;
export const Sets = styled.div`
  background: rgb(206,41,51);
  padding: 1em;
  border-radius: 20px;
  box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
  overflow: hidden;
  color: white;
  padding-top: 2em;
  .set-done {
    .set-frame {
      border-color: #05ec05!important;
      color: #05ec05!important;
    }
    svg {
      color: #05ec05!important;
    }
  }
  .set-frame {
    border: 1px solid white;
    border-radius: 20px;
    padding: 0 12px;
    line-height: 35px;
    display: flex;
    .set-settings {
      display: flex;
      flex: 1;
      .set-training {
        margin-right: 1em;
        width: 40%;
        font-size: 1.2em;
        font-weight: 700;
        display: flex;
        button {
          max-height: 40px;
        }
        span {
          font-weight: 100;
          font-size: 0.8em;
        }
      }
      .set-weight {
        margin-right: 1em;
        font-size: 1.2em;
        font-weight: 700;
        span {
          font-weight: 100;
          font-size: 0.8em;
        }
      }
    }
    .set-execution {
      font-size: 1.5em;
      margin-top: 5px;
    }
  }
  svg {
    color: white;
  }
  .create-protocoll-button {
    text-align: center;
    margin-top: 2em;
    button {
      padding: 0;
      color: rgb(220,0,78)!important;
      svg {
        font-size: 1.5em;
      }
    }
  }
  .MuiInputBase-input {
    color: white;
  }
  label {
    color: white;
  }
  .MuiInputAdornment-root {
    p {
      color: white;
    }
  }
  .buttons {
    margin-top: 2em;
    display: flex;
    justify-content: space-between;
    button {
      box-shadow: none;
      background: rgb(206,41,51);
      border: 1px solid white;
      color: white;
    }
  }
  .sets-title {
    font-size: 2em;
    font-weight: 900;
    margin-bottom: 0.5em;
  }
  .set-wrapper {
    margin-bottom: 1em;
  }
  .add-all-button {
    float: right;
    margin-top: 0.4em;
    box-shadow: none;
    background: rgb(206,41,51);
    border: 1px solid white;
    color: white;
    :hover {
      background: rgb(206,41,51)!important;
    }
  }
`;

export const StyledInputNumber = styled(InputNumber)`
  display: flex;
  height: 100%;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    -moz-user-select: none!important;
    -webkit-user-select: none!important;
    -ms-user-select: none!important;
    user-select: none!important;
  }
  .rc-input-number {
    margin: 0;
    padding: 0;
    line-height: 26px;
    font-size: 12px;
    height: 26px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
    transition: all .3s;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-focused {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler {
    text-align: center;
    line-height: 12px;
    overflow: hidden;
    display: block;
    height: 100%;
    width: 100%;
    -ms-touch-action: none;
        touch-action: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-active {
    background: #ddd;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-up-inner,
  .rc-input-number-handler-down-inner {
    color: #666666;
    -moz-user-select: none;
     -ms-user-select: none;
         user-select: none;
    -webkit-user-select: none;
  }
  .rc-input-number:hover {
    border-color: #1890ff;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number:hover .rc-input-number-handler-up,
  .rc-input-number:hover .rc-input-number-handler-wrap {
    border-color: #1890ff;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-disabled:hover {
    border-color: #d9d9d9;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-disabled:hover .rc-input-number-handler-up,
  .rc-input-number-disabled:hover .rc-input-number-handler-wrap {
    border-color: #d9d9d9;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-input-wrap {
    overflow: hidden;
    height: 100%;
    width: 33.3%;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-input {
    width: 100%;
    text-align: center;
    outline: 0;
    -moz-appearance: textfield;
    line-height: 26px;
    height: 100%;
    transition: all 0.3s ease;
    color: #666666;
    border: 0;
    padding: 0;
    transition: all .3s;
    background-color: rgb(206,41,51);
    color: white!important;
    font-size: 0.85em;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-wrap {
    float: right;
    width: 33.3%;
    height: 100%;
    transition: all .3s;
    font-family: 'Material Icons';
    display: flex;
    align-items: center;
    justify-content: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-up {
    padding-top: 1px;
    transition: all .3s;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-up-inner:after {
    content: 'keyboard_arrow_up';
    font-size: 35px;
    color: white;
    line-height: 1em;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-down {
    transition: all .3s;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-down-inner:after {
    content: 'keyboard_arrow_down';
    font-size: 35px;
    color: white;
    line-height: 1em;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rc-input-number-handler-down-disabled,
  .rc-input-number-handler-up-disabled {
    opacity: 0.72;
  }
  .rc-input-number-handler-down-disabled:hover,
  .rc-input-number-handler-up-disabled:hover {
    color: #999;
    border-color: #d9d9d9;
  }
  .rc-input-number-disabled .rc-input-number-input {
    opacity: 0.72;
    cursor: not-allowed;
  }
  .rc-input-number-disabled .rc-input-number-handler {
    opacity: 0.72;
  }
  .rc-input-number-disabled .rc-input-number-handler:hover {
    color: #999;
    border-color: #d9d9d9;
  }
`;
