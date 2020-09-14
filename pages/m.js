import React from "react";
import Router from 'next/router';

function Redirect({pathname}) {

  React.useEffect(() => {
    /*
    Router.push({
      pathname: '/',
    });
    */
    console.log("PATHNAME:");
    console.log(pathname);

    let hash = '';

    if (typeof window !== 'undefined') {
      console.log(window.location.hash);
      hash = window.location.hash;
    }

    if( hash && hash.indexOf('#showPlan') > -1 ) {
      console.log("REDIRECT TO WORKOUTS...");
      Router.push({
        pathname: '/publicplan',
        query: {
          workout: hash.split('/')[1],
        }
      });
    } else if( hash && hash.indexOf('#onSearchExercises') > -1 ) {
      console.log("REDIRECT TO EXERCISES...");
      const parameters = hash.split('/');
      console.log("parameters");
      console.log(parameters);
      console.log("REDIRECTING...");
      Router.push({
        pathname: '/exercises',
        query: {
          muscle: parameters[1],
          type: parameters[2],
          addition: parameters[3],
          exercises: parameters[4],
        }
      });
    } else {
      Router.push({
        pathname: '/',
      });
    }

  });

  return (
    <div>Redirecting...</div>
  );

}

Redirect.getInitialProps = context => {
  console.log("Redirect");
  console.log(context);
  return ({
    pathname: context,
  })
};

export default Redirect;
