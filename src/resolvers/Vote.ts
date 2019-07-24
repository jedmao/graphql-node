import FieldResolver from 'types/FieldResolver'

export const link: FieldResolver = (parent, _args, { prisma }) =>
	prisma.vote({ id: parent.id }).link()

export const user: FieldResolver = (parent, _args, { prisma }) =>
	prisma.vote({ id: parent.id }).user()
