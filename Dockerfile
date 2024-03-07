ARG NODE_VERSION=20

##    T O O L S
## ********************************************
FROM jazzypro/base-tools:v1.2 AS tools
FROM jazzypro/base-tools:alpine AS alpine-tools


##    P A C K E R
## ********************************************
FROM node:${NODE_VERSION}-slim AS packer
ARG CODEARTIFACT_AUTH_TOKEN


ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV HUSKY=0
ENV CODEARTIFACT_AUTH_TOKEN=${CODEARTIFACT_AUTH_TOKEN}
ENV DIR /var/www
WORKDIR $DIR

## Enable PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

## Copy tools & configuration
COPY --from=tools tools/ /bin/
COPY docker/etc /etc/

## Prepare Docker Entrypoints
COPY docker/*-entrypoint.sh /usr/local/bin/

## Build cache
COPY app/package.json app/pnpm-lock.yaml app/.npmrc $DIR/
RUN --mount=type=cache,target=/root/.local/share/pnpm/store/v3 pnpm fetch

## Install dependencies
RUN --mount=type=cache,target=/root/.local/share/pnpm/store/v3 pnpm install --frozen-lockfile

## Copy the application
COPY app $DIR


##    D E V E L O P M E N T
## ********************************************
FROM packer AS development

## Install procps for development (required by NestJS)
RUN --mount=type=cache,target=/var/cache/apt apt-get -q update \
  && apt-get -y -q --no-install-recommends install procps \
  && apt-get -q -y autoremove \
  && apt-get -q clean \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV development

## Prepare *-entrypoints
COPY docker/*-entrypoint.sh /usr/local/bin/

## Run application and expose required ports
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "start:dev"]
EXPOSE 80


##    B U I L D E R
## ********************************************
FROM packer AS builder

ENV DIR /var/www
ENV NODE_ENV production
ENV APP_ENV prod
ENV HUSKY=0
ENV CI=1
WORKDIR $DIR

## Build application
RUN pnpm build

## Reduce development dependencies
RUN pnpm prune --prod && rm .npmrc


##    S E R V E R
## ********************************************
FROM node:${NODE_VERSION}-alpine

ENV DIR /app
ENV NODE_ENV production
ENV APP_ENV prod
ENV HUSKY=0
ENV CI=1
WORKDIR $DIR

## Copy tools & configuration
COPY --from=alpine-tools tools/ /bin/
COPY docker/etc /etc/

## Copy application with required things
COPY --from=builder --chown=node:node /var/www/dist $DIR/dist
COPY --from=builder --chown=node:node /var/www/node_modules $DIR/node_modules

## Prepare entrypoints
COPY docker/docker-entrypoint.sh /usr/local/bin/

## Run application and expose required ports
USER node
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "start:dist"]
EXPOSE 80
