import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

export const Panel = styled.div`
  font-family: Roboto;
  height: 100%;
  min-height: 100vh;
  background: rgb(209, 209, 209);
  display: flex;
  flex-flow: column;
  .header {
    color: black;
    width: 100vw;
    .header-inner-frame {
      align-items: center;
      display: flex;
      padding: 1em;
      .title {
        font-weight: 900;
        font-size: 2em;
      }
    }
  }
  .graphics-section {
    padding: 0 4em 0em 0em;
    max-width: 100vw;
    overflow: hidden;
    padding-bottom: 3em;
    .slick-slider {
      overflow: visible;
      .slick-list {
        overflow: visible;
      }
    }
    .no-data {
      padding: 4em 2em;
      color: white;
      text-align: center;
    }
    .graphic-wrapper {
      padding: 0 1em;
      .graphic-weight {
        background: ${props => props.theme.colors.primary};
      }
      .graphic-caliper {
        background: ${props => props.theme.colors.primary};
        .MuiSvgIcon-root {
          font-size: 4em;
        }
      }
      .graphic-volume {
        background: ${props => props.theme.colors.primary};
        .MuiSvgIcon-root {
          font-size: 4em;
        }
      }
      .graphic-futrex {
        background: ${props => props.theme.colors.primary};
        .MuiSvgIcon-root {
          font-size: 4em;
        }
      }
    }
    .graphic{
      background: white;
      height: 90vw;
      margin: 0 1.5em;
      border-radius: 20px;
      box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
      overflow: hidden;
      display: flex;
      flex-flow: column;
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
  }
  .data-section {
    flex: 1;
    padding: 0.5em 1em 5em 1em;
    background-color: white;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12);
    padding-top: 1em;
    .create-protocoll-button {
      text-align: center;
      .MuiButtonBase-root {
        font-size: 2em;
        svg {
          color: ${props => props.theme.colors.primary};
        }
      }
    }
    .no-records {
      padding: 4em 2em;
      text-align: center;
    }
    .list-record.selected {
      background: #777777!important;
      color: white!important;
      border-radius: 5px;
      line-height: 2em;
      .MuiButtonBase-root {
        margin-right: 1em;
      }
      .MuiButton-containedSecondary {
        background-color: ${props => props.theme.colors.primary};
      }
    }
    .list-record {
      display: flex;
      padding: 1em 2em;
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-bottom-color: #eaeaea;
      .record-date {
        flex: 1;
      }
      .record-value {
        flex: 1;
        text-align: right;
        font-size: 1.2em;
        font-weight: 900;
      }
    }
  }
  .MuiSnackbar-root {
    .MuiSnackbarContent-root {
      background-color: #ffa000;
      margin: 8px;
      .MuiSnackbarContent-message {
        span {
          display: flex;
          align-items: center;
          .MuiSvgIcon-root {
            opacity: 0.9;
            margin-right: 8px;
            font-size: 20px;
          }
        }
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

export const StyledButton = styled(Fab)`
  position: fixed!important;
  bottom: 10px;
  left: 50%;
  margin-left: -28px!important;
  background-color: ${props => props.theme.colors.primary}!important;
`;

export const StyledCaliper = styled.div`
  .header-section {
    text-align: center;
    margin-bottom: 1em;
    font-weight: 900;
  }
  .record-entry {
    display: flex;
    justify-content: space-between;
    padding: 1em 0;
  }
  .caliper-total{
    margin-top: 1em;
    font-weight: 900;
  }
`;

export const StyledSwipeableDrawer = styled(SwipeableDrawer)`
  .MuiPaper-root {
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    padding: 2em;
  }
`;
