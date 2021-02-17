import './App.css'

import { Link, Route, Switch, useHistory } from 'react-router-dom'
import Companies from './components/companies'
import Company from './components/company'
import { createMuiTheme, IconButton, ThemeProvider } from '@material-ui/core'
import Home from '@material-ui/icons/Home'
import Drivers from './components/drivers'
import Trailers from './components/trailers'

const StyledLink = props => (
    <Link
        style={{
            fontSize: '2em',
            color: '#fff',
            marginBottom: 20,
            textDecoration: 'none'
        }}
        {...props}
    ></Link>
)

function App() {
    const history = useHistory()

    return (
        <div className="App">
            <ThemeProvider theme={createMuiTheme({})}>
                <header className="App-header">
                    GraphQL Proof of Concept
                    <IconButton style={{ color: '#fff' }} onClick={() => history.push('/')}>
                        <Home />
                    </IconButton>
                </header>
                <main>
                    <Switch>
                        <Route path="/companies">
                            <Switch>
                                <Route exact path="/companies">
                                    <Companies />
                                </Route>
                                <Route path={`/companies/:id`}>
                                    <Company />
                                </Route>
                            </Switch>
                        </Route>
                        <Route exact path="/drivers">
                            <Drivers />
                        </Route>
                        <Route exact path="/trailers">
                            <Trailers />
                        </Route>
                        <Route path="/">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <StyledLink to="/companies">Companies</StyledLink>
                                <StyledLink to="/drivers">Drivers</StyledLink>
                                <StyledLink to="/trailers">Trailers</StyledLink>
                                <StyledLink to="/trucks">Trucks</StyledLink>
                            </div>
                        </Route>
                    </Switch>
                </main>
            </ThemeProvider>
        </div>
    )
}

export default App
