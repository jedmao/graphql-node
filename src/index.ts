import { GraphQLServer } from 'graphql-yoga'
import { stringArg, idArg } from 'nexus'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import * as path from 'path'

import dataModelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'

const Query = prismaObjectType({
	name: 'Query',
	definition(t) {
		t.prismaFields(['*'])
	},
})

const Mutation = prismaObjectType({
	name: 'Mutation',
	definition(t) {
		t.prismaFields(['createUser', 'createPost'])
		t.field('updateEmail', {
			type: 'User',
			args: {
				id: idArg(),
				email: stringArg(),
			},
			resolve: (_, { id, email }) =>
				prisma.updateUser({
					where: { id },
					data: { email },
				}),
		})
	},
})

const Post = prismaObjectType({
	name: 'Post',
	definition(t) {
		t.prismaFields(['id', 'published', 'title', 'author'])
		t.string('uppercaseTitle', {
			resolve: ({ title }) => title.toUpperCase(),
		})
	},
})

const server = new GraphQLServer({
	schema: makePrismaSchema({
		types: [Query, Mutation, Post],
		prisma: {
			datamodelInfo: dataModelInfo,
			client: prisma,
		},
		outputs: {
			schema: path.join(__dirname, 'generated', 'schema.gql'),
			typegen: path.join(__dirname, 'generated', 'nexus.ts'),
		},
	}),
	context: { prisma },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
