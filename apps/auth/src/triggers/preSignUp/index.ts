import { buildHandler } from './handler'
import { PreSignUpTriggerEvent } from 'aws-lambda'

export const handler = async (event: PreSignUpTriggerEvent) =>
  buildHandler(event)
