#!/bin/sh
set -e

export HUSKY=0

#################### Dependencies

waitfor tcp://${DATABASE_HOST}:${DATABASE_PORT}

#################### Project init

echo "NODE_ENV: ${NODE_ENV:-Not defined!}"
echo "APP_ENV: ${APP_ENV:-Not defined!}"
#echo "LOGGER_CONSOLE_LEVEL: ${LOGGER_CONSOLE_LEVEL}"

#################### Tests init

pnpm install  --prefer-offline --frozen-lockfile

# Run migrations
#pnpm run t:m:r

pnpm run lint
pnpm run prettier
pnpm run test:ci

#################### End of init
