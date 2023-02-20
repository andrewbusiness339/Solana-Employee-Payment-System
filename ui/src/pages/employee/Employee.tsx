import { Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Slide, SlideProps, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import moment from 'moment'

import { useMutation, useQuery } from '@apollo/client'
import {mutations, queries} from '../../graphql/graphql';

import Project from './Project';
import { useWallet } from "@solana/wallet-adapter-react";

type registeredwallet = {
  walletaddress : any
  item : any
  name : any
  project : any
  wallet : any
  amount : any
  time : any
  period : any
  key : any
  transactionHash : any
}

type TransitionProps = Omit<SlideProps, 'direction'>
export default function Employee(props : any) {
  const [period, setPeriod] = useState("daily") 
  const [openNofity, setOpenNofity] = useState(false)
  const [message, setMessage] = useState("Generate New Wallet")
  const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined)

  const wallet = useWallet();

  const walletAddr = {wallet: wallet.connected ? wallet.publicKey!.toBase58(): "not connected"}

  const { data } = useQuery(queries.GET_CLAIMER, { variables : { wallet : walletAddr.wallet } })

  // useEffect(() => {
  //   // console.log("Wallet : " ,walletAddr.wallet)
  //   if(data !== undefined) {
  //     console.log(typeof data , " Data : " ,data, " ", data.getClaimer, " " , )

  //     data.getClaimer.forEach((item : registeredwallet) => {
  //         console.log("ITEM: ", item)
  //         console.log(typeof item.transactionHash , " transaction : ", item.transactionHash)
  //     })
  //   }
  // });

  return(
    <>

      <Grid sx={{p: 2}}>
        {
          wallet.connected ? 
            data !== undefined ?
              <>
                <Grid> User : { data.getClaimer[0].name } </Grid>
                <Grid> Registered Wallet : {wallet.connected && wallet.publicKey!.toBase58()}</Grid>
              </>
              :
              <>
                <Grid> User : You have no project
                </Grid>
                <Grid> Registered Wallet : {wallet.connected && wallet.publicKey!.toBase58()}</Grid>
              </>

            :
            "Connect your wallet"
        }
      </Grid>

      <Grid>
        <Grid container spacing={2} justifyContent="center" sx={{p: 2}}>
          <Grid item xs={2}>
            Project Name :
          </Grid>
          <Grid item xs={1}>
            Sol to be recieved
          </Grid>
          
          <Grid item xs={1}>
            How often
          </Grid>
            
          <Grid item xs={3}>
            Upcoming payment date
          </Grid>
          <Grid item xs={5}>
            Do Claim
          </Grid>
        </Grid>

        {
          data !== undefined ?
            data.getClaimer.map((item : registeredwallet) => 
              <Project project={item.project} wallet={item.wallet} amount={item.amount} time={item.time} period={item.period} tx={item.transactionHash} />
            )
            :
            "Unable to show now"
        }

      </Grid>

    </>
  )
}