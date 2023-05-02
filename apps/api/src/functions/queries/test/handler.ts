import { AppSyncResolverEvent } from 'aws-lambda'

interface Test {
  id: string
}

export const buildHandler = async (
  event: AppSyncResolverEvent<any>
): Promise<Test> => {
  return {
    id: '123',
  }
}
