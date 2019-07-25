import identity from '@queso/identity'

import FieldResolver from '../types/FieldResolver'

const newLinkSubscribe: FieldResolver = (_parent, _args, { prisma }) =>
	prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()

export const newLink = {
	subscribe: newLinkSubscribe,
	resolve: identity,
}

const newVoteSubscribe: FieldResolver = (_parent, _args, { prisma }) =>
	prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node()

export const newVote = {
	subscribe: newVoteSubscribe,
	resolve: identity,
}
