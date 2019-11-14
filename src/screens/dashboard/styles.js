import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  flex-flow: column;
  background: rgb(220,0,78);
  overflow: hidden;
  .header {
    height: 50px;
    align-items: center;
    display: flex;
    background: rgb(220, 0, 78);
    color: white;
    padding: 1em;
  }
  .user-info {
    font-size: 0.8em;
    button {
      border-color: white;
      color: white;
    }
    .user-name {
      flex: 1;
      .first {
        font-weight: 900;
        font-size: 2em;
      }
      .last {
        font-size: 1.5em;
        font-weight: 100;
        line-height: 1em;
      }
    }
  }
  .banners {
    padding: 0px 4em 2em 0em;
    .slick-slider {
      overflow: visible;
      .slick-list {
        overflow: visible;
      }
    }
    .banner-wrapper {
      padding: 0 1em;
    }
    .banner{
      background: white;
      height: 25vh;
      margin: 0 1.5em;
      border-radius: 15px;
      box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
      overflow: hidden;
      .banner-image {
        height: 100%;
        background-size: cover;
      }
    }
  }
  .content {
    flex: 1;
    padding: 0 1em 5em 1em;
    background-color: whitesmoke;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    .empty-list-text {
      margin-top: calc(50vh - 56px - 75px);
      line-height: 1.5em;
      font-size: 1.2em;
      font-weight: 100;
      text-align: center;
      color: grey;
    }
    .MuiCardHeader-title {
      font-weight: 900;
    }
    .active {
      .MuiAvatar-root {
        background: #4caf50!important;
      }
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
