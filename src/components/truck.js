// import React, { useEffect, useState } from 'react'

// import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core'
// import { gql, useMutation, useQuery } from '@apollo/client'
// import { useHistory, useParams } from 'react-router-dom'

// const NewTruck = () => {
//     const [company, setCompany] = useState({
//         _id: '',
//         city: '',
//         company: '',
//         lastUpdated: '',
//         name: '',
//         state: ''
//     })
//     const { goBack } = useHistory()
//     const {loading: companiesLoading, data: companies } = useQuery(
//         gql`
//             {
//                 companies {
//                     company
//                     name
//                 }
//             }
//         `
//     )
//     const { loading: driversLoading, data: drivers } = useQuery(
//         gql`
//             {
//                 drivers {
//                     _id
//                     firstName
//                     lastName
//                 }
//             }
//         `
//     )

//     const [insertTruck, { data: updatedResult }] = useMutation(
//         gql`
//             mutation(
//                 $id: ObjectId
//                 $name: String
//                 $city: String
//                 $state: String
//                 $lastUpdated: String
//             ) {
//                 updateOneCompany(
//                     query: { _id: $id }
//                     set: { name: $name, city: $city, state: $state, lastUpdated: $lastUpdated }
//                 ) {
//                     _id
//                     city
//                     company
//                     lastUpdated
//                     name
//                     state
//                 }
//             }
//         `,
//         {
//             variables: {
//                 id: company._id,
//                 name: company.name,
//                 city: company.city,
//                 state: company.state,
//                 lastUpdated: new Date().toDateString()
//             }
//         }
//     )

//     const { updateOneCompany = { _id: null } } = updatedResult || {}

//     useEffect(() => {
//         const { company } = companyResult || { company: {} }

//         if (company._id) {
//             setCompany(company)
//         }
//     }, [companyResult])

//     useEffect(() => {
//         const { _id } = updateOneCompany || { updateOneCompany: { _id: null } }

//         if (_id) {
//             setCompany(updateOneCompany)
//         }
//     }, [updateOneCompany])

//     const handleChange = ({ target: { name, value } }) => setCompany({ ...company, [name]: value })

//     const handleSave = () => {
//         updateCompany()
//     }

//     return (
//         <Paper style={{ minWidth: 500, padding: 24 }}>
//             <Typography style={{ marginBottom: 20 }} component="h2" variant="h6">
//                 {company.company && <>{`${company.company}, ${company.name}`}</>}
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         style={{ width: '100%' }}
//                         label="Number"
//                         disabled
//                         value={company.company}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         name="name"
//                         onChange={handleChange}
//                         style={{ width: '100%' }}
//                         label="Name"
//                         value={company.name}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         name="city"
//                         onChange={handleChange}
//                         style={{ width: '100%' }}
//                         label="City"
//                         value={company.city}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         name="state"
//                         onChange={handleChange}
//                         style={{ width: '100%' }}
//                         label="State"
//                         value={company.state}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField
//                         style={{ width: '100%' }}
//                         label="Last Updated"
//                         disabled
//                         value={company.lastUpdated}
//                     />
//                 </Grid>
//             </Grid>
//             <Grid container spacing={2} justify="flex-end">
//                 <Button
//                     style={{ margin: '20px 5px' }}
//                     color="secondary"
//                     variant="contained"
//                     onClick={() => goBack()}
//                 >
//                     Back
//                 </Button>
//                 <Button
//                     style={{ margin: '20px 5px' }}
//                     color="secondary"
//                     variant="contained"
//                     onClick={() => handleSave()}
//                 >
//                     Save
//                 </Button>
//             </Grid>
//         </Paper>
//     )
// }

// export default NewTruck
