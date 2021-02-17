import './App.css'

import { Link, Route, Switch, useHistory } from 'react-router-dom'
import Companies from './components/companies'
import Company from './components/company'
import { createMuiTheme, IconButton, ThemeProvider } from '@material-ui/core'
import Home from '@material-ui/icons/Home'
import Drivers from './components/drivers'
import Trailers from './components/trailers'
import Trucks from './components/trucks'
import NewTruck from './components/truck'
import { useState } from 'react'

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
    const [page, setPage] = useState('')

    return (
        <div className="App">
            <ThemeProvider theme={createMuiTheme({})}>
                <header className="App-header">
                    GraphQL Proof of Concept{page && <> &gt; </>}
                    {page}
                    <IconButton
                        style={{ color: '#fff' }}
                        onClick={() => {
                            setPage('')
                            history.push('/')
                        }}
                    >
                        <Home />
                    </IconButton>
                </header>
                <main>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            margin: '24px 0',
                            width: '100%'
                        }}
                    >
                        <StyledLink onClick={() => setPage('Companies')} to="/companies">
                            Companies
                        </StyledLink>
                        <StyledLink onClick={() => setPage('Drivers')} to="/drivers">
                            Drivers
                        </StyledLink>
                        <StyledLink onClick={() => setPage('Trailers')} to="/trailers">
                            Trailers
                        </StyledLink>
                        <StyledLink onClick={() => setPage('Trucks')} to="/trucks">
                            Trucks
                        </StyledLink>
                    </div>
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
                        <Route exact path="/trucks">
                            <Trucks />
                        </Route>
                        {/* <Switch>
                            <Route exact path="/trucks">
                                <Trucks />
                            </Route>
                            <Route path={`/trucks/add`}>
                                <NewTruck />
                            </Route>
                        </Switch> */}
                        <Route path="/"></Route>
                    </Switch>
                </main>
            </ThemeProvider>
        </div>
    )
}

export default App
