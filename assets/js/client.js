import ApolloClient from 'apollo-boost'

const errorLink = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      // window.location.href = "/500"
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    // window.location.href = "/"
  }
}

const httpLink = '/api'

//  Use after login
const client = new ApolloClient({
  uri: httpLink,
  onError: errorLink,
})

export default client
