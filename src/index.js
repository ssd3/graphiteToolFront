import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './App.js'
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/'
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <HashRouter>
            <ScrollToTop>
                <App apolloClient={client} />
            </ScrollToTop>
        </HashRouter>
    </ApolloProvider>,
    document.getElementById('root')
)
