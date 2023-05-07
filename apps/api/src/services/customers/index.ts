import { CustomersRepository } from '../../repositories'
import { StripeCustomer } from '../../domain'

interface CustomersServiceDeps {
  internalCustomersRepository: CustomersRepository
  externalCustomersRepository: Pick<CustomersRepository, 'store'>
}

type CreateCustomerResult = StripeCustomer

interface CreateCustomerArgs {
  userId: string
  email: string
}

interface CreateOrRetrieveArgs {
  userId: string
  email: any
}

export class CustomersService {
  constructor(protected deps: CustomersServiceDeps) {
    //
  }

  async get(id: string): Promise<StripeCustomer> {
    return this.deps.internalCustomersRepository.get(id)
  }

  async findByEmail(email: string): Promise<StripeCustomer> {
    return this.deps.internalCustomersRepository.findByEmail(email)
  }

  async createOrRetrieve(args: CreateOrRetrieveArgs): Promise<StripeCustomer> {
    let customer = await this.deps.internalCustomersRepository.findByUserId(
      args.userId
    )

    if (!customer) {
      customer = await this.create(args)
    }

    return customer
  }

  protected async create(
    args: CreateCustomerArgs
  ): Promise<CreateCustomerResult> {
    const customer = await this.deps.externalCustomersRepository.store(args)

    await this.deps.internalCustomersRepository.store(customer)

    return customer
  }
}
