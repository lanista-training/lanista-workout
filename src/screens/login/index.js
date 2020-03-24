import * as React from "react";
import Login from './Login';
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from '../../lib/apollo'
import { LOGIN } from "../../mutations/authenticate";

const LoginPanel = ({studio, doLogin, goToRegistration}) => {
  const[bu, setBu] = React.useState(null)
  const[loginImage, setLoginImage] = React.useState(null)
  React.useEffect(() => {
    if(typeof window !== 'undefined' && window.document && window.document.createElement) {
      if( studio ) {
        let newLoginImage = "url(https://lanista-training.com/bus/" + studio + "/logo.png?_dc" + Math.random() + ")"
        setLoginImage(newLoginImage)
        setBu(studio)
      } else {
        const host = document.location.host;
        //const host = 'basefit-mobile.lanista-training.com'
        let cleanHost = host.replace("-mobile", "")
        let newBu = cleanHost.split(".")[0]
        newBu = newBu === "" || newBu.indexOf('localhost') > -1 ? 'mobile' : newBu
        console.log("newBu");
        console.log(newBu);
        let newLoginImage = (newBu !== "mobile") ? "url(https://lanista-training.com/bus/" + newBu + "/logo.png)" : (typeof window.cordova === 'undefined') ? "url(https://lanista-training.com/images/lanista-logo-red.png)" : "url(img/lanista-logo.png)"
        setBu(newBu)
        setLoginImage(newLoginImage)
      }
    }
  }, []);

  const [authenticateUser, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN,
    {
      update(cache,  {data}) {
        const { token, user } = data.login
        doLogin({ token })
      }
    }
  );

  const onAuthenticate = (email, password) => {
    authenticateUser({
      variables: {
        email: email,
        password: password,
        bu: (bu && bu.indexOf('basefit') > -1) ? 95 : null,
      }
    })
  }

  const goRegistration = () => {
    goToRegistration();
  }

  return (
    <Login
      authenticated={false}
      loading={loginLoading}
      loginError={loginError}
      onAuthenticate={onAuthenticate}
      bu={bu}
      loginImage={loginImage}
      goRegistration={goRegistration}
    />
  )
}

export default withApollo(LoginPanel);
