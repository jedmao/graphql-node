import FieldResolver from 'types/FieldResolver'

export const feed: FieldResolver = async (_parent, args, { prisma }) => {
	const where = args.filter
		? {
				OR: [
					{ description_contains: args.filter },
					{ url_contains: args.filter },
				],
		  }
		: {}

	return {
		links: await prisma.links({
			where,
			skip: args.skip,
			first: args.first,
			orderBy: args.orderBy,
		}),
		count: await prisma
			.linksConnection({
				where,
				skip: args.skip,
			})
			.aggregate()
			.count(),
	}
}
