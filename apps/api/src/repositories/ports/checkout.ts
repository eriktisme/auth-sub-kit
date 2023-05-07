export interface CreateSessionArgs {
  customerId: string
  metadata: Record<string, any>
  priceId: string
  quantity: number
}

export interface CreateSessionResult {
  sessionId: string
}

export interface CreateBillingPortalSessionArgs {
  customerId: string
}

export interface CreateBillingPortalSessionResult {
  url: string
}

export interface CheckoutRepository {
  createBillingPortalSession(
    args: CreateBillingPortalSessionArgs
  ): Promise<CreateBillingPortalSessionResult>
  createSession(args: CreateSessionArgs): Promise<CreateSessionResult>
}
