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

const Trailers = () => {
    const { loading, data } = useQuery(gql`
        query allTrailers {
            trailers {
                _id
                currentCity
                currentState
                number
                company {
                    company
                    city
                    name
                    state
                }
            }
        }
    `)

    const { trailers } = data || { trailers: [] }

    return (
        <Paper style={{ minWidth: 700 }}>
            <TableContainer component={Paper} style={{ maxHeight: 600 }}>
                {loading && <LinearProgress />}
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <ColumnHeader>Id</ColumnHeader>
                            <ColumnHeader>Current Location</ColumnHeader>
                            <ColumnHeader>Company</ColumnHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trailers.map(
                            ({
                                _id,
                                number: trailerNumber,
                                currentCity,
                                currentState,
                                company
                            }) => {
                                const { company: companyNumber, name: companyName, city, state } =
                                    company || {}

                                return (
                                    <TableRow key={_id} hover={true}>
                                        <TableCell component="th">
                                            {companyNumber || '??'}:{trailerNumber}
                                        </TableCell>
                                        <TableCell>
                                            {currentCity}, {currentState}
                                        </TableCell>
                                        <TableCell>
                                            {companyName
                                                ? `${companyName} - ${city}, ${state}`
                                                : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Trailers
