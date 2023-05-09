import { buildHandler } from './handler'
import { DefineAuthChallengeTriggerEvent } from 'aws-lambda'

export const handler = async (event: DefineAuthChallengeTriggerEvent) =>
  buildHandler(event)
