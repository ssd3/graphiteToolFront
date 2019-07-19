import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql/'
})

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
}

export default HttpClient
