import { Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Slide, SlideProps, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useState } from "react";
import moment from 'moment'
import { useMutation, useQuery } from '@apollo/client'

import axios from './utils/axios';
import {mutations, queries} from '../../graphql/graphql';

type TransitionProps = Omit<SlideProps, 'direction'>
export default function Admin() {
  const [period, setPeriod] = useState("daily") 
  const [openNofity, setOpenNofity] = useState(false)
  const [message, setMessage] = useState("Generate New Wallet")
  const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined)

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [project, setProject] = useState('')
  const [wallet, setWallet] = useState('')
  const [time, setTime] = useState('')
  
  const [createWallet] = useMutation(mutations.CREAT_PROJECT);
  const [createClaimer] = useMutation(mutations.ADD_CLAIMER);

  const onPeriod = (e: SelectChangeEvent) => {
    setPeriod(e.target.value as any)
  }
  
  function TransitionLeft(props: TransitionProps){
    return <Slide {...props} direction="left" />
  }

  const onCloseNofity = () => {
    setOpenNofity(false)
  }

  const onGenerate = async () => {
    console.log(name, " " , project, " " , wallet , " " , amount, " ", period, " ", time)

    if (project == '') {
      console.log('Project field must be required.')
      setMessage('Project field must be required')
      setTransition(() => TransitionLeft)
      setOpenNofity(true)
    } else {
      createWallet({ variables: { project } }).then(
          (res) => {
              console.log(res);
              console.log("You added a project.")
              setMessage("Successfully Added")
              setTransition(() => TransitionLeft)
              setOpenNofity(true)
          },
          (err) => {
              console.log(err);
          }
        );
    }
  }

  const onAddMoreWallet = async() => {
    console.log(name, " " , project, " " , wallet , " " , amount, " ", period, " ", time)
    
    if (project == '' || name =='' || wallet == '' || amount == '') {
      // console.log('Every field must be required')
      setMessage("Every field must be required")
      setTransition(() => TransitionLeft)
      setOpenNofity(true)
    } else {
      createClaimer({ variables: { project, name, amount, wallet, period, time } }).then(
          (res) => {
              console.log(res);
              console.log("You generated a project.")
              
              setMessage("Successfully Generated")
              setTransition(() => TransitionLeft)
              setOpenNofity(true)
          },
          (err) => {
              console.log(err);
          }
        );
    }
  }
  return(
    <Grid container spacing={2} justifyContent="center" sx={{p: 2}}>
      <Grid container xs={12} spacing={2} sx={{p: 2}}>
        <Grid item xs={2} justifyContent="center">
          <Button variant="outlined" onClick={onGenerate}>Generate Wallet</Button>
        </Grid>
        <Grid item xs={2}>
          <TextField fullWidth id="standard-basic" label="Project" variant="outlined" onChange={(e) => {setProject(e.target.value)}}/>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <TextField fullWidth id="standard-basic" label="Name" variant="outlined" onChange={(e) => {setName(e.target.value)}}/>
      </Grid> 
      <Grid item xs={4}>
        <TextField fullWidth id="standard-basic" label="Wallet" variant="outlined" onChange={(e) => {setWallet(e.target.value)}}/>
      </Grid>
      <Grid item xs={1}>
        <TextField fullWidth id="standard-basic" label="Sol" variant="outlined" onChange={(e) => {setAmount(e.target.value)}}/>
      </Grid>
      
      <Grid item xs={2}>
        <FormControl fullWidth variant="outlined" >
          {/* <InputLabel id="demo">Period</InputLabel> */}
          <Select labelId="demo"
            id="demo" value={period} onChange={onPeriod} >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
            <MenuItem value={"biweekly"}>BiWeekly</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
          </Select>
        </FormControl>
      </Grid>
        
      <Grid item xs={3}>
        <TextField fullWidth id="datetime=local" label="Date and Time" type="datetime-local" defaultValue={moment().format('yyyy-MM-ddThh:mm:ss')} sx={{width: 250}} InputLabelProps={{shrink: true}} onChange={(e) => {setTime(e.target.value)}}/>
      </Grid>
      <Grid item xs={12}>
        <Box component="span">
          <Button variant="outlined" onClick={onAddMoreWallet}>Add More Wallets</Button>
        </Box>
      </Grid>
      <Snackbar
        open={openNofity}
        onClose={onCloseNofity}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ''}
      />
    </Grid>
  )
}


// CFP5DqoTZGsaCToD7aLoKsWzrcK28iVjNSnXpiA8yxK6
// P B   8gMxfrfTLxqzCLkzXHCrcKYy52Y5pjJ2X1vfkEMCoqCy