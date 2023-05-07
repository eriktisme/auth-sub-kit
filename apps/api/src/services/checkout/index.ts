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

interface CreateBillingPortalSessionArgs {
  customerId: string
}

interface CreateBillingPortalSessionResult {
  url: string
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

  async createBillingPortalSession(
    args: CreateBillingPortalSessionArgs
  ): Promise<CreateBillingPortalSessionResult> {
    const { url } =
      await this.deps.checkoutRepository.createBillingPortalSession(args)

    return {
      url,
    }
  }
}
