import { buildHandler } from './handler'
import { CreateAuthChallengeTriggerEvent } from 'aws-lambda'

export const handler = async (event: CreateAuthChallengeTriggerEvent) =>
  buildHandler(
    {
      //
    },
    event
  )
