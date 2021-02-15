import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const StyledPanel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-flow: column;
  background: rgb(220,0,78);
  overflow: hidden;
  .modal-blocker {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background: #0000009c;
  }
  .MuiLinearProgress-root  {
    z-index: 3;
  }
  .header {
    background: rgb(220, 0, 78);
    color: white;
    position: fixed;
    width: 100vw;
    top: 10px;
    left: 0;
    .header-inner-frame {
      align-items: center;
      display: flex;
      padding: 1em;
      .gmy-logo {
        width: 100px;
        height: 60px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
  .user-info {
    font-size: 0.8em;
    button {
      border-color: white;
      color: white;
      border-radius: 15px;
    }
    .user-name {
      flex: 1;
      .first {
        font-weight: 900;
        font-size: 2em;
        .MuiSkeleton-root {
          font-size: 0.5em;
          margin: 0.5em;
        }
      }
      .last {
        font-size: 1.5em;
        font-weight: 100;
        line-height: 1em;
        .MuiSkeleton-root {
          font-size: 0.65em!important;
          margin: 0.5em;
        }
      }
    }
  }
  .content-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    overflow: scroll;
    width: 100%;
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
    .MuiPickersBasePicker-containerLandscape {
      align-self: center;
    }
    .content-title {
      margin: 20px 0;
      font-weight: 100;
      font-size: 20px;
    }
    .form {
      display: flex;
      flex-flow: column;
      max-width: 500px;
      margin-right: auto;
      margin-left: auto;
      margin-top: 30px;
      padding-right: 30px;
      padding-left: 30px;
      .MuiFormControl-root  {
        margin-top: 20px;
      }
    }
    .button-section {
      margin-top: 50px;
      display: flex;
      align-self: center;
    }
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