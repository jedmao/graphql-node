import { ContextParameters } from 'graphql-yoga/dist/types'

import { Prisma } from '../generated/prisma-client'

type ResolverContext = ContextParameters & {
	prisma: Prisma
}

export default ResolverContext
