import { verify } from 'jsonwebtoken'

import ResolverContext from 'types/ResolverContext'

export const APP_SECRET = 'GraphQL-is-aw3some'

export function getUserId(context: ResolverContext) {
	const Authorization = context.request.get('Authorization')
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		const { userId } = verify(token, APP_SECRET) as { userId: string }
		return userId
	}

	throw new Error('Not authenticated')
}
