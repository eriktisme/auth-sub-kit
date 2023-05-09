import { DefineAuthChallengeTriggerEvent } from 'aws-lambda'

export const buildHandler = async (
  event: DefineAuthChallengeTriggerEvent
): Promise<DefineAuthChallengeTriggerEvent> => {
  try {
    if (
      event.request.session &&
      event.request.session.length >= 3 &&
      !event.request.session.slice(-1)[0].challengeResult
    ) {
      event.response.failAuthentication = true
      event.response.issueTokens = false
    } else if (
      event.request.session &&
      event.request.session.length > 0 &&
      event.request.session.slice(-1)[0].challengeResult
    ) {
      event.response.failAuthentication = false
      event.response.issueTokens = true
    } else {
      event.response.challengeName = 'CUSTOM_CHALLENGE'
      event.response.failAuthentication = false
      event.response.issueTokens = false
    }
  } catch (error) {
    return error
  }

  return event
}
