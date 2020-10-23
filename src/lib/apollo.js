import React, { useMemo } from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import { onError } from "apollo-link-error"
import { persistCache } from 'apollo-cache-persist'
import { setContext } from 'apollo-link-context'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import {TranslatorProvider} from '../hooks/Translation'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {logout} from './auth-web';

export function withApollo (PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const [client, setClient] = React.useState(undefined);
    React.useEffect(() => {
      const initData = {
        client: null,
        loaded: false,
      }
      const cache = new InMemoryCache(initData);
      const authLink = setContext((_, { headers }) => {
        const token = cookie.get('token')
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
          }
        }
      })
      const errorLink = authLink.concat(onError(({ graphQLErrors, networkError }) => {
        console.log("NEW ERROR");
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
            if(message.indexOf('invalid token') > -1) {
              console.log("LOGOUT");
              logout();
            }
          });
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }));

      // Website Link
      //var graphqlServer = 'https://' + document.location.host + '/graphql';

      // App Link
      //var graphqlServer = 'https://mobile.lanista-training.com/graphql';

      // Local Test Link
      var graphqlServer = 'http://localhost:4000/graphql';


      const httpLink = errorLink.concat(new HttpLink({
        uri: graphqlServer,
        credentials: 'same-origin',
        fetch: fetch
      }))
      const wsClient = new SubscriptionClient(
        "ws://localhost:3001",
        { lazy: true, reconnect: true },
        null,
        [],
      );
      const wsLink = new WebSocketLink(wsClient);
      const link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
      )
      const client = new ApolloClient({
        link: authLink.concat(link),
        cache: cache,
      });
      persistCache({
        cache,
        storage: window.localStorage
      }).then(() => {
        client.onResetStore(async () => cache.writeData({ data: initData }));
        setClient(client);
      });
      return () => {};
    }, []);
    if (client === undefined) return <div>Loading...</div>;
    return (
      <ApolloProvider client={client}>
        <TranslatorProvider client={client}>
          <PageComponent {...pageProps} client={client}/>
        </TranslatorProvider>
      </ApolloProvider>
    )
  }
  return WithApollo
}
