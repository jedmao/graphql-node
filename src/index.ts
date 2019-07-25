import { GraphQLServer } from 'graphql-yoga'

import { prisma } from './generated/prisma-client'
import * as Query from './resolvers/Query'
import * as Mutation from './resolvers/Mutation'
import * as Subscription from './resolvers/Subscription'
import * as User from './resolvers/User'
import * as Link from './resolvers/Link'
import * as Vote from './resolvers/Vote'

const server = new GraphQLServer({
	typeDefs: './src/schema.gql',
	resolvers: {
		Query,
		Mutation,
		Subscription,
		User,
		Link,
		Vote,
	},
	context: params => ({
		...params,
		prisma,
	}),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
