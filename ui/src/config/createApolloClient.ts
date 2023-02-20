import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    credentials: 'include',
    uri: 'http://localhost:8080/graphql'
    // link: createHttpLink({ uri: '/graphql' })
});

export default client;
