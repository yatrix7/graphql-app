import React from 'react'

import {
    Fab,
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
import { Add as AddIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const Trucks = () => {
    const history = useHistory()
    const { loading, data } = useQuery(gql`
        query allTrucks {
            trucks {
                _id
                currentCity
                currentState
                company {
                    name
                }
                driver {
                    firstName
                    lastName
                }
            }
        }
    `)

    const { trucks } = data || { trucks: [] }

    return (
        <Paper style={{ minWidth: 700, position: 'relative' }}>
            <TableContainer component={Paper} style={{ maxHeight: 600 }}>
                {loading && <LinearProgress />}
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <ColumnHeader>Id</ColumnHeader>
                            <ColumnHeader>Company</ColumnHeader>
                            <ColumnHeader>Driver</ColumnHeader>
                            <ColumnHeader>Current Location</ColumnHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trucks.map(
                            ({
                                _id,
                                currentCity,
                                currentState,
                                company,
                                driver: { firstName, lastName }
                            }) => {
                                const { name: companyName } = company || {}

                                return (
                                    <TableRow key={_id} hover={true}>
                                        <TableCell component="th">{_id}</TableCell>
                                        <TableCell>{companyName || 'N/A'}</TableCell>
                                        <TableCell>
                                            {firstName} {lastName}
                                        </TableCell>
                                        <TableCell>
                                            {currentCity}, {currentState}
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Fab
                style={{ position: 'absolute', bottom: 10, right: 10 }}
                color="primary"
                onClick={() => history.push('/trucks/add')}
            >
                <AddIcon />
            </Fab> */}
        </Paper>
    )
}

export default Trucks
