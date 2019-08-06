import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql/'
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : '',
        }
    }
})

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        // resultCaching: false
    }),
    defaultOptions: defaultOptions
})
/*
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql'

 */
    /*
    clientState: {
        defaults: {},
        resolvers: {},
        typeDefs: '',
    }
     */
// })


class HttpClient {
    static getData(query, variables = {}) {
        return new Promise((resolve, reject) => {
            client
                .query({
                    query: query,
                    variables: variables
                })
                .then(result => { return resolve(result) })
                .catch(error => { return reject(error.message) })

        })
    }

    static postData(mutate, variables = {}) {
        return new Promise((resolve, reject) => {
            client
                .mutate({
                    mutation: mutate,
                    variables: variables
                })
                .then(result => { return resolve(result) })
                .catch(error => { return reject(error.message) })

        })
    }
}

export { HttpClient, client }


// export { client }

