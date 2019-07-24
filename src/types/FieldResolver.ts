import { IFieldResolver } from 'graphql-tools'

import { ID_Output } from 'generated/prisma-client'

import ResolverContext from './ResolverContext'

export type FieldResolver<
	TSource = { id: ID_Output },
	TArgs = any
> = IFieldResolver<TSource, ResolverContext, TArgs>

export default FieldResolver
