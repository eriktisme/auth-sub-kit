# Getting started

## Setup the development environment

To set up the development environment, you will need to install [Node](https://nodejs.org/en/download/)
and [PNPM](https://pnpm.io/installation).

## Deploy the infrastructure on AWS

To deploy the entire project into your AWS account you need to
configure [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html#cli-configure-quickstart-creds)
and set them up to be used in the [CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html).

## Useful commands

All the following commands are used to install dependencies or deploy.

- `pnpm i`: To install the external dependencies.
- `pnpm cdk deploy`: To deploy the AWS infrastructure.
- `pnpm vercel deploy`: To deploy the web applications.
- `pnpm test`: To run the unit tests.
