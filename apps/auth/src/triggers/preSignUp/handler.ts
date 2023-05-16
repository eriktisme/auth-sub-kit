import { PreSignUpTriggerEvent } from 'aws-lambda'

export const buildHandler = async (
  event: PreSignUpTriggerEvent
): Promise<PreSignUpTriggerEvent> => {
  event.response.autoConfirmUser = true

  if (event.request.userAttributes.hasOwnProperty('email')) {
    event.response.autoVerifyEmail = true
  }

  return event
}
