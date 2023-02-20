import { gql } from 'apollo-server-express';

export default gql`
	type Wallet {
		id: ID!
		project: String!
		secretKey: String!
		createdAt: String!
		updatedAt: String!
	}

	extend type Query {
		getWallets: [Wallet]
		getWallet(project: String!): Wallet!
	}

	extend type Mutation {
		createWallet(project: String!): Wallet
	}
`;