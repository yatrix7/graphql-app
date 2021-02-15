import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as Realm from 'realm-web'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
const APP_ID = 'application-0-jdoxb'
const graphQLUrl = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

const app = new Realm.App(APP_ID)

async function getValidAccessToken() {
    if (!app.currentUser) {
        // If no user is logged in, log in an anonymous user
        await app.logIn(Realm.Credentials.anonymous())
    } else {
        // The logged in user's access token might be stale,
        // Refreshing custom data also refreshes the access token
        await app.currentUser.refreshCustomData()
    }
    // Get a valid access token for the current user
    return app.currentUser.accessToken
}
const client = new ApolloClient({
    link: new HttpLink({
        uri: graphQLUrl,
        fetch: async (uri, options) => {
            const accessToken = await getValidAccessToken()
            options.headers.Authorization = `Bearer ${accessToken}`
            return fetch(uri, options)
        }
    }),
    cache: new InMemoryCache()
})

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
