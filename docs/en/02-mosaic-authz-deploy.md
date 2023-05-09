# mosaic authz deploy

This page describes how to build and host the application yourself. Please use any service or server to host your application.

## required

This application requires the following environment

- node.js 18.x

## install application

Install the application. This procedure is shown based on the assumption that the system is built in a linux environment.

```shell
curl -LO https://github.com/ymuichiro/mosaic-authz/archive/refs/tags/0.1.1.tar.gz
tar zxvf 0.1.1.tar.gz
cd mosaic-authz-0.1.1
npm ci
touch .env.local
```

Prepare the environment variable `.env.local` in the root of the project as follows

```.env.local
OAUTH_DISCORD_CLIENT_ID=client id for discord bot
OAUTH_DISCORD_CLIENT_SECRET=client secret for discord bot
DISCORD_BOT_TOKEN=token for discord bot
DISCORD_ROLE_ID=Specify the id of the role created in discord setup
DISCORD_SERVER_ID=Specify the id of the server created in discord setup
SYMBOL_MOSAIC_ID=Specify the id of the mosaic that will be granted access to the channel
SYMBOL_ADMIN_PRIVATE_KEY=Specify private key for new Symbol account
SYMBOL_ADMIN_PUBLIC_KEY=Specify public key for new Symbol account
NEXT_PUBLIC_URL=http://${your-domain};
SYMBOL_NETWORK_TYPE=production = 104 development 152
SYMBOL_NODE_URL=http://${node-domain}:3001
TZ=UTC
```

The following procedure can be used to start the system.

```shell
npm run build
npm run start
```

## optional: deploy by container

A docker container is also available. Please obtain the container below, specify the environment variables, and launch it.

```sh
docker pull ghcr.io/ymuichiro/mosaic-authz:latest
docker run -p 3000:3000 --env-file .env.local ghcr.io/ymuichiro/mosaic-authz:latest
```
