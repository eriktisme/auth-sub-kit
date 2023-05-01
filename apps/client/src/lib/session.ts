export const getCurrentUser = async (Auth: any) => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser()

    return currentUser
  } catch (e) {
    if (e !== 'No current user') {
      console.error('An error occurred fetching current user', e)
    }

    return null
  }
}
