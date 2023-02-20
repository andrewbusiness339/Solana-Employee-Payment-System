import { gql } from 'apollo-server-express';

export default gql`
	type Claimer {
		id: ID!
		project: String!
    name: String!
		amount: String!
		period: String!
		time: String!
		transactionHash: String
		wallet: String!
		createdAt: String!
		updatedAt: String!
	}

	type Query {
		getClaimers: [Claimer]
		getClaimer(wallet: String!): [Claimer]
	}

	type Mutation {
		createClaimer(project: String!, name: String!, amount: String!, wallet: String!, time: String!, period: String!): Claimer
		clickClaim(project: String!, wallet: String!): Claimer
	}
`;