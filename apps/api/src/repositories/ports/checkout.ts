export interface CreateSessionArgs {
  customerId: string
  metadata: Record<string, any>
  priceId: string
  quantity: number
}

export interface CreateSessionResult {
  sessionId: string
}

export interface CheckoutRepository {
  createSession(args: CreateSessionArgs): Promise<CreateSessionResult>
}
