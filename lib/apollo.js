import React, { useMemo } from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { persistCache } from 'apollo-cache-persist'
import { setContext } from 'apollo-link-context'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import {TranslatorProvider} from '../src/hooks/Translation'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

let apolloClient = null

export function withApollo (PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = useMemo(
      () => apolloClient || initApolloClient(apolloState),
      []
    )
    console.log("WithApollo")
    return (
      <ApolloProvider client={client}>
        <TranslatorProvider client={client}>
          <PageComponent {...pageProps} client={client}/>
        </TranslatorProvider>
      </ApolloProvider>
    )
  }
  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }
    WithApollo.displayName = `withApollo(${displayName})`
  }
  // Allow Next.js to remove getInitialProps from the browser build
  if (typeof window === 'undefined') {
    if (ssr) {
      WithApollo.getInitialProps = async ctx => {
        const { AppTree } = ctx
        let pageProps = {}
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx)
        }
        const apolloClient = initApolloClient()
        try {
          // Run all GraphQL queries
          const { getDataFromTree } = await import('@apollo/react-ssr')
          await getDataFromTree(
            <AppTree
              pageProps={{
                ...pageProps,
                apolloClient
              }}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
        // Extract query data from the Apollo store
        const apolloState = apolloClient.cache.extract()
        return {
          ...pageProps,
          apolloState
        }
      }
    }
  }
  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient (initialState) {
  console.log("initApolloClient")
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }
  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState)
  }
  return apolloClient
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function  createApolloClient (initialState = {me: {}}) {
  console.log("createApolloClient")
  const isBrowser = typeof window !== 'undefined'
  const authLink = setContext((_, { headers }) => {
    const token = cookie.get('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
  const cache = new InMemoryCache().restore(initialState);
  // await before instantiating ApolloClient, else queries might run before the cache is persisted
  if( isBrowser ) {
     persistCache({
      cache,
      storage: window.localStorage,
    });
  }
  let link = null;
  console.log("SETTING THE LINK 2")
  const httpLink = authLink.concat(new HttpLink({
    //uri: 'https://mobile.lanista-training.com/graphql',
    uri: (typeof document !== 'undefined') ? (document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/graphql') : 'https://mobile.lanista-training.com/graphql',
    credentials: 'same-origin',
    fetch: !isBrowser && fetch
  }))
  if( isBrowser ) {
    const wsClient = new SubscriptionClient(
      "ws://localhost:3001",
      { lazy: true, reconnect: true },
      null,
      [],
    );
    const wsLink = isBrowser ? new WebSocketLink(wsClient) : null;
    link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  } else {
    link = httpLink
  }
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(link),
    cache: cache,
    connectToDevTools: true,
  })
}
