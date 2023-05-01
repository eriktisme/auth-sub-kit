FROM node:18-alpine AS dependencies

RUN npm i -g pnpm@8.1.0

WORKDIR /app

ENV NODE_ENV=production

COPY ../../package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM node:18-alpine AS builder

RUN npm i -g pnpm@8.1.0

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=development

WORKDIR /app

COPY ../.. .

RUN pnpm install --frozen-lockfile

RUN NODE_ENV=production pnpm build

FROM node:18-alpine AS production

RUN npm i -g pnpm@8.1.0

WORKDIR /app

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node --from=builder app/next.config.js ./
COPY --chown=node --from=builder app/.next ./.next
COPY --chown=node --from=builder app/pnpm-lock.yaml /app/package.json ./
COPY --chown=node --from=dependencies app/node_modules ./node_modules

USER node
EXPOSE 3000

CMD [ "pnpm", "start" ]
