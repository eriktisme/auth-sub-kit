import { CreateAuthChallengeTriggerEvent } from 'aws-lambda'
import { HandlerDeps } from './types'

export const buildHandler = async (
  deps: HandlerDeps,
  event: CreateAuthChallengeTriggerEvent
): Promise<CreateAuthChallengeTriggerEvent> => {
  console.log(JSON.stringify(event, null, 2))

  const email = event.request.userAttributes.email

  let secretLoginCode
  if (!event.request.session || !event.request.session.length) {
    secretLoginCode = Math.floor(100000 + Math.random() * 900000)

    // TODO: Send email with code
    console.log(secretLoginCode)
  } else {
    const previousChallenge = event.request.session.slice(-1)[0]
    secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1]
  }

  event.response.publicChallengeParameters = {
    email,
  }

  event.response.privateChallengeParameters = { answer: secretLoginCode }

  event.response.challengeMetadata = `CODE-${secretLoginCode}`

  return event
}
