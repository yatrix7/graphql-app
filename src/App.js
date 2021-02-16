import './App.css'

import { Route, Switch } from 'react-router-dom'
import Companies from './components/companies'
import Company from './components/company'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={createMuiTheme({})}>
                <header className="App-header">GraphQL Proof of Concept</header>
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
                    </Switch>
                </main>
            </ThemeProvider>
        </div>
    )
}

export default App
