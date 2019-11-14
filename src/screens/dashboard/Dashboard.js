import * as React from "react";
import moment from "moment";
import {Panel, UserAvatar, StyledButton, StyledCard} from './styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MenuButton from '../../components/MenuButton';
import Slider from "react-slick";

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true
};

export default ({firstName, lastName, photoUrl, plans, onLogout, openWorkout, openWorkouts, showBanners, banners}) => {
  return (
    <Panel>
      <div className="user-info header">
        <div className="user-name">
          <div className="first">{firstName}</div>
          <div className="last">{lastName}</div>
        </div>
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          size="small"
          onClick={openWorkouts}
        >
          Workouts
        </Button>
      </div>
      {
        showBanners && <div className="banners">
          <Slider {...settings}>
            {
              banners.map(banner => (
                <div className="banner-wrapper">
                  <div className="banner">
                    <div className="banner-image" style={{
                      backgroundImage: 'url(' + banner.imageUrl + ')'
                    }}/>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      }
      <div className="content">
        {plans && plans.length == 0 &&
          <div className="empty-list-text">Verwende den Knopf oben rechts um neue Trainingspläne zu finden</div>
        }
        {plans && plans.map(plan => (
          <StyledCard
            key={plan.id}
            className={moment(parseInt(plan.expiration_date)).isAfter() || plan.duration == 0 ? 'active' : 'expired'}
            onClick={() => openWorkout(plan.id)}
          >
            <CardActionArea>
              <Card>
                <CardHeader
                  title={plan.name}
                  subheader={
                    plan.days ? plan.days + (plan.days > 1 ? ' Tage/Woche' : ' Tag / Woche') : 'Keine Plandauer'
                  }
                  avatar={
                    <Avatar>
                      {!moment(new Date(parseInt(plan.expiration_date))).isAfter() && plan.duration > 0 && <TimerOffIcon />}
                      {(moment(new Date(parseInt(plan.expiration_date))).isAfter() || !(plan.duration > 0)) && <PlayCircleOutlineIcon />}
                    </Avatar>
                  }
                >
                </CardHeader>
                <CardContent>
                  {plan.description}
                </CardContent>
              </Card>
            </CardActionArea>
          </StyledCard>
        ))}
      </div>
      <MenuButton/>
    </Panel>
  )
};
