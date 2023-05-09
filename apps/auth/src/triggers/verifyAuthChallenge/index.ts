import { buildHandler } from './handler'
import { VerifyAuthChallengeResponseTriggerEvent } from 'aws-lambda'

export const handler = async (event: VerifyAuthChallengeResponseTriggerEvent) =>
  buildHandler(event)
