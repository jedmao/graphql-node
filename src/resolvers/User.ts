import FieldResolver from 'types/FieldResolver'

export const links: FieldResolver = (parent, _args, { prisma }) =>
	prisma.user({ id: parent.id }).links()
