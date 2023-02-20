import gql from 'graphql-tag'

export const GET_TOKEN = gql`
  query getToken( $name: String! ) {
    getToken(name: $name) {
      mint
      name
      symbol
      logo
      decimal
      value
    }
  }
`

export const GET_TOKENS = gql`
  query getTokens {
    getTokens {  
      mint
      name
      symbol
      decimal
      value
      logo    
    }
  }
`

export const GET_TRANSACTIONS = gql`
  query getTransactions {
    getTransactions {  
      wallet
      transactionHash
      from
      to
      fromAmount
      toAmount
      type
    }
  }
`
export const GET_TRANSACTION = gql`
  query getTransaction($transactionHash: String!) {
    getTransaction(transactionHash: $transactionHash) {  
      wallet
      transactionHash
      from
      to
      fromAmount
      toAmount
      type
    }
  }
`

export const GET_CLAIMER = gql`
  query getClaimer($wallet: String!) {
    getClaimer(wallet: $wallet) {
      project
      name
      amount
      wallet
      period
      time
      transactionHash
    }
  }
` 