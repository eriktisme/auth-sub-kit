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
  } catch (e) {
    if (e !== 'No current user') {
      console.error('An error occurred fetching current user', e)
    }

    return null
  }
}
