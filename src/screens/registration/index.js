import * as React from "react";
import { useTranslate } from '../../hooks/Translation';
import Registration from './Registration';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withApollo } from '../../lib/apollo'
import { GYMS } from "../../queries";
import { REGISTER } from "../../mutations";
import validator from 'validator';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

const RegistrationPanel = ({studio, goBack, hasNorch}) => {
  const {locale, t} = useTranslate("registration");
  const[recaptchaToken, setRecaptchaToken] = React.useState(null)
  const[filter, setFilter] = React.useState('')
  const[email, setEmail] = React.useState('')
  const[emailIsValid, setEmailIsValid] = React.useState(false)
  const[searchType, setSearchType] = React.useState(false)
  const[finished, setFinished] = React.useState(false)
  const[selectedGym, setSelectedGym] = React.useState(null)
  const[errorMessage, setErrorMessage] = React.useState(null)
  const { data: gyms, error: gymsError, gymsLoading } = useQuery(GYMS, {
    variables: {
      filter: filter,
      searchType: searchType,
    },
    fetchPolicy: 'network-only'
  });
  const [register, { loading: registerLoading, error: registerError }] = useMutation(
    REGISTER,
    {
      update(cache,  {data}) {
        const { message, user } = data.register
        if(message) {
          setFinished(true)
        }
      }
    }
  );
  React.useEffect(() => {
    if( registerError ) {
      setErrorMessage(t("registration_problem"));
    }
  }, [registerError]);
  const onEmailChange = (e) => {
    setEmailIsValid(validator.isEmail(e.target.value))
    setEmail(e.target.value)
  }
  const toggleSearchType = () => {
    setSearchType( !searchType )
  }
  const isBrowser = typeof window.cordova === 'undefined';
  const onRegister = () => {
    register({
      variables: {
        email: email,
        recaptchaToken: isBrowser ? recaptchaToken : "6LdxOscUAAAAABV4CpcKtVooD61OFXFvcOajsaDM11566119",
        gym: selectedGym ? selectedGym.id : null,
        language: locale
      }
    })
  }
  const renderRoot = () => {
    return(isBrowser ?
      <GoogleReCaptchaProvider reCaptchaKey="6LdxOscUAAAAABV4CpcKtVooD61OFXFvcOajsaDM">
        {!hasNorch && <GoogleReCaptcha onVerify={token => setRecaptchaToken(token)} />}
        <Registration
          onGoBack={goBack}
          filter={filter}
          onFilterChange={e => setFilter(e.target.value)}
          email={email}
          onEmailChange={onEmailChange}
          emailIsValid={emailIsValid}
          loading={gymsLoading || !gyms}
          gyms={gyms ? gyms.gyms : []}
          setSelectedGym={bu => {
            setSelectedGym(bu)
          }}
          selectedGym={selectedGym}
          register={onRegister}
          finished={finished}
          registerError={registerError}
          errorMessage={errorMessage}
          searchType={searchType}
          toggleSearchType={toggleSearchType}
          registering={registerLoading}
          hasNorch={hasNorch}
        />
      </GoogleReCaptchaProvider>
      :
      <Registration
        onGoBack={goBack}
        filter={filter}
        onFilterChange={e => setFilter(e.target.value)}
        email={email}
        onEmailChange={onEmailChange}
        emailIsValid={emailIsValid}
        loading={gymsLoading || !gyms}
        gyms={gyms ? gyms.gyms : []}
        setSelectedGym={bu => {
          setSelectedGym(bu)
        }}
        selectedGym={selectedGym}
        register={onRegister}
        finished={finished}
        registerError={registerError}
        errorMessage={errorMessage}
        searchType={searchType}
        toggleSearchType={toggleSearchType}
        registering={registerLoading}
        hasNorch={hasNorch}
      />
    )
  }
  return renderRoot();
}

export default withApollo(RegistrationPanel);
