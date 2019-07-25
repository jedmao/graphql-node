import FieldResolver from '../types/FieldResolver'

export const postedBy: FieldResolver = (parent, _args, { prisma }) =>
	prisma.link({ id: parent.id }).postedBy()

export const votes: FieldResolver = (parent, _args, { prisma }) =>
	prisma.link({ id: parent.id }).votes()
