import { VerifyAuthChallengeResponseTriggerEvent } from 'aws-lambda'

export const buildHandler = async (
  event: VerifyAuthChallengeResponseTriggerEvent
): Promise<VerifyAuthChallengeResponseTriggerEvent> => {
  const expectedAnswer = event.request.privateChallengeParameters.answer

  event.response.answerCorrect =
    event.request.challengeAnswer === expectedAnswer

  return event
}
