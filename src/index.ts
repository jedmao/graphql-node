import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({
	typeDefs: './src/schema.gql',
	resolvers: {
		ProductInterface: {
			__resolveType: () => 'SimpleProduct',
		},
		Query: {
			products: (_product: any, _args: any, context: any) => ({
				items: [
					{
						name: context.elasticsearch(),
					},
				],
			}),
		},
	},
	context: params => ({
		...params,
	}),
})

server.start(({ port }) =>
	console.log(`Server is running on http://localhost:${port}`),
)
