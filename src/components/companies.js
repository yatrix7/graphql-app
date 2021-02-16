import React from 'react'

import {
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const Companies = props => {
    const { loading, error, data } = useQuery(gql`
        query allCompanies {
            companies {
                _id
                company
                name
                lastUpdated
            }
        }
    `)

    const { companies } = data || { companies: [] }

    return (
        <Paper style={{ minWidth: 700 }}>
            <TableContainer component={Paper}>
                {loading && <LinearProgress />}
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map(({ _id, company, name, lastUpdated }) => {
                            console.log(_id)
                            return (
                                <TableRow key={company} hover={true}>
                                    <TableCell component="th">{company}</TableCell>
                                    <TableCell>
                                        <Link to={`/companies/${_id}`}>{name}</Link>
                                    </TableCell>
                                    <TableCell>{lastUpdated}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Companies
