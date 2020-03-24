import { Component } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const login = async ({ token }) => {
  cookie.set('token', token, { expires: 1 })
  console.log("Token: ")
  console.log( token )
  console.log( cookie )
  /*
  if( token ) {
    Router.push('/');
  }
  */
}

export const signup = async ({ token }) => {
  cookie.set('token', token, { expires: 1 })
  // localStorage.setItem('token', token)
  Router.push('/')
}

export const logout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    constructor (props) {
      super(props);
      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount () {
      const {token} = this.props;
      console.log("token");
      console.log(token);
      if( token ) {
        console.log("AUTHENTICATED");
      } else {
        console.log("NOT AUTHENTICATED");
        //Router.push('login');
        window.location.href = './login.html'
      }
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event) {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

export const auth = ctx => {
  const { token } = nextCookie(ctx)
  const cctoken = ctx.query.cctoken
  const bu = ctx.query.bu
  //console.log(ctx.req.headers.host)
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
   /*
  if (ctx.req && !token) {
    if( cctoken ) {
      ctx.res.writeHead(302, { Location: '/login?cctoken=' + cctoken })
    } else {
      if( bu ) {
        ctx.res.writeHead(302, { Location: '/login?bu=' + bu })
      } else {
        ctx.res.writeHead(302, { Location: '/login' })
      }
    }
    ctx.res.end()
    return
  }
  */
  // We already checked for server. This should only happen on client.

  if (!token) {
    //Router.push('/login')
    //Router.push('/login')
    /*
    if( cctoken ) {
      Router.push({
        pathname: '/login',
        query: { cctoken: cctoken }
      });
    } else {
      Router.push('/login');
    }
    */
  }
  return token
}
