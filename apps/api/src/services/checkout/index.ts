import { CheckoutRepository } from '../../repositories'

interface CheckoutServiceDeps {
  checkoutRepository: CheckoutRepository
}

interface CreateSessionArgs {
  customerId: string
  metadata: Record<string, any>
  priceId: string
  quantity: number
}

interface CreateSessionResult {
  sessionId: string
}

export class CheckoutService {
  constructor(protected deps: CheckoutServiceDeps) {
    //
  }

  async createSession(args: CreateSessionArgs): Promise<CreateSessionResult> {
    const { sessionId } = await this.deps.checkoutRepository.createSession(args)

    return {
      sessionId,
    }
  }
}
