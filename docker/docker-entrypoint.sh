#!/bin/sh
set -e

#################### Dependencies

waitfor tcp://${DATABASE_HOST}:${DATABASE_PORT}

#################### Project init

echo "APP_ENV: ${APP_ENV:-Not defined!}"

if [ "${NODE_ENV}" != "production" ]; then
	pnpm install --prefer-offline --frozen-lockfile
	pnpm build
fi

# Run migrations
#pnpm run t:m:r

#################### End of init

exec "$@"
