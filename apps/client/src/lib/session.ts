import { User } from '@/domain'

export const getCurrentUser = async (Auth: any): Promise<User | null> => {
  try {
    const { attributes } = await Auth.currentAuthenticatedUser()

    return {
      email: attributes.email,
      firstName: attributes.given_name,
      lastName: attributes.family_name,
      photo: attributes.picture,
    }
  } catch (err) {
    if (!['The user is not authenticated', 'No current user'].includes(err)) {
      console.error('An error occurred fetching current user', err)
    }

    return null
  }
}
