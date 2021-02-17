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
import ColumnHeader from './columnHeader'

const Drivers = () => {
    const { loading, data } = useQuery(gql`
        query allDrivers {
            drivers {
                _id
                firstName
                lastName
                status
                company {
                    city
                    name
                    state
                }
            }
        }
    `)

    const { drivers } = data || { drivers: [] }

    return (
        <Paper style={{ minWidth: 700 }}>
            <TableContainer component={Paper}>
                {loading && <LinearProgress />}
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <ColumnHeader>Name</ColumnHeader>
                            <ColumnHeader>Status</ColumnHeader>
                            <ColumnHeader>Company</ColumnHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {drivers.map(({ _id, firstName, lastName, status, company }) => {
                            const { name, city, state } = company || {}

                            return (
                                <TableRow key={_id} hover={true}>
                                    <TableCell component="th">
                                        {firstName} {lastName}
                                    </TableCell>
                                    <TableCell>{status}</TableCell>
                                    <TableCell>
                                        {name ? `${name} - ${city}, ${state}` : 'N/A'}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Drivers
