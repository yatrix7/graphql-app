import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as Realm from 'realm-web'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

const APP_ID = 'application-0-jdoxb'
const graphQLUrl = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`
const app = new Realm.App(APP_ID)

async function loginApiKey(apiKey) {
    // Create an API Key credential
    const credentials = Realm.Credentials.apiKey(apiKey)
    try {
        // Authenticate the user
        const user = await app.logIn(credentials)
        // `App.currentUser` updates to match the logged in user
        // assert(user.id === app.currentUser.id)
        return user
    } catch (err) {
        console.error('Failed to log in', err)
    }
}

loginApiKey('EHUCehUgBvGr5RpOz4NFEEhZnlepn6xtOx6DeSwrdpLxVX8qx2gZiHGANifSfttp').then(user => {
    console.log('Successfully logged in!', user)

    ReactDOM.render(
        <React.StrictMode>
            <ApolloProvider
                client={
                    new ApolloClient({
                        link: new HttpLink({
                            uri: graphQLUrl,
                            fetch: async (uri, options) => {
                                options.headers.Authorization = `Bearer ${user.accessToken}`
                                return fetch(uri, options)
                            }
                        }),
                        cache: new InMemoryCache()
                    })
                }
            >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </React.StrictMode>,
        document.getElementById('root')
    )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
