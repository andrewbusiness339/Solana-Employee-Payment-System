import gql from 'graphql-tag'

export const CREAT_PROJECT = gql`
  mutation createWallet(
    $project: String!
  ) {
    createWallet(
      project: $project
    ) {
      project
      secretKey
    }
  }
`

export const ADD_CLAIMER = gql`
  mutation createClaimer(
    $project: String!,
    $name: String!,
    $amount: String!,
    $wallet: String!,
    $period: String!,
    $time: String!,
  ) {
    createClaimer(
      project: $project,
      name: $name,
      amount: $amount,
      wallet: $wallet
      period: $period
      time: $time
    ) {
      project
      name
      amount
      wallet
      period
      time
      transactionHash
      createdAt
      updatedAt
    }
  }
`

export const CLAIM = gql`
  mutation clickClaim(
    $project: String!,
    $wallet: String!,
  ) {
    clickClaim(
      project: $project,
      wallet: $wallet,
    ) {
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
