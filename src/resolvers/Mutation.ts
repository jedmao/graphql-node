import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { APP_SECRET, getUserId } from 'utils'
import FieldResolver from 'types/FieldResolver'

export const post: FieldResolver = (_parent, { url, description }, context) => {
	const userId = getUserId(context)
	return context.prisma.createLink({
		url,
		description,
		postedBy: { connect: { id: userId } },
	})
}

export const signup: FieldResolver = async (_parent, args, context) => {
	const user = await context.prisma.createUser({
		...args,
		password: await hash(args.password, 10),
	})

	return {
		token: sign({ userId: user.id }, APP_SECRET),
		user,
	}
}

export const login: FieldResolver = async (
	_parent,
	{ email, password },
	context,
) => {
	const user = await context.prisma.user({ email })
	if (!user) {
		throw new Error('No such user found')
	}

	const valid = await compare(password, user.password)
	if (!valid) {
		throw new Error('Invalid password')
	}

	return {
		token: sign({ userId: user.id }, APP_SECRET),
		user,
	}
}

export const vote: FieldResolver = async (_parent, { linkId }, context) => {
	const userId = getUserId(context)
	const linkExists = await context.prisma.$exists.vote({
		user: { id: userId },
		link: { id: linkId },
	})
	if (linkExists) {
		throw new Error(`Already voted for link: ${linkId}`)
	}

	return context.prisma.createVote({
		user: { connect: { id: userId } },
		link: { connect: { id: linkId } },
	})
}
