import { Grid, Button, TextField, FormControl, Select, MenuItem, SelectChangeEvent, SlideProps } from "@mui/material";
import React, { useState, useEffect } from "react";
import moment from 'moment'

import { useMutation, useQuery } from '@apollo/client'
import {mutations, queries} from '../../graphql/graphql';

type TransitionProps = Omit<SlideProps, 'direction'>

export default function Project(props : any) {
  const [clickClaim] = useMutation(mutations.CLAIM);
  
  const onClaim = () => {
    const current = new Date().toLocaleString();
    const date = new Date(props.time).toLocaleString();

    const now = new Date(current);
    const time = new Date(date);

    console.log("Claim clicked")
    if(time < now) {
      console.log("Can claim!!!");
      clickClaim({ variables: { project : props.project, wallet : props.wallet} }).then(
          (res) => {
              console.log(res);
              console.log("Transaction Success.")
          },
          (err) => {
              console.log(err);
          }
        );
    } else {
      console.log("Can't claim until payment date");
      alert("Can't claim until payment date");
    }

  }

  // useEffect(() => {
  //   console.log("Props: ", props.project);
  // })

  return(
    <>
      <Grid container spacing={2} justifyContent="center" sx={{px: 2, py: 1}}>
        <Grid item xs={2}>
          <TextField fullWidth id="outlined-basic" variant="outlined" value={props.project} disabled/>
        </Grid>
        <Grid item xs={1}>
          <TextField fullWidth id="outlined-basic" variant="outlined" value={props.amount} disabled/>
        </Grid>
        
        <Grid item xs={1}>
          <TextField fullWidth id="outlined-basic" variant="outlined" value={props.period} disabled/>
        </Grid>
          
        <Grid item xs={3}>
          <TextField fullWidth id="datetime=local" type="datetime-local" defaultValue={props.time} InputLabelProps={{shrink: true}} disabled/>
        </Grid>
        <Grid item xs={5}>
          {
            props.tx == null || props.tx == "" ? 
              <Button variant="contained" onClick={onClaim} sx={{p : 2}} fullWidth>Claim</Button>
              :
              <TextField fullWidth id="outlined-basic" variant="outlined" value={props.tx} disabled/>
          }
        </Grid>
      </Grid>
    </>
  )
}