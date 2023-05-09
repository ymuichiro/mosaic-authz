# mosaic authz deploy

本ページでは自身でビルドを行いホスティングする手順を記載します。アプリケーションのホスティング先は任意のサービス、サーバーを利用下さい。

## required

本アプリケーションは以下の環境を必要とします。

- node.js 18.x

## install application

アプリケーションをインストールして下さい。本手順は linux 環境における構築を前提に示します。SSL 化を行う際には別途 nginx 等の構築を行なって下さい。

```shell
curl -LO https://github.com/ymuichiro/mosaic-authz/archive/refs/tags/0.1.1.tar.gz
tar zxvf 0.1.1.tar.gz
cd mosaic-authz-0.1.1
npm ci
touch .env.local
```

環境変数 `.env.local` をプロジェクトのルートへ以下の通り用意してください

```.env.local
OAUTH_DISCORD_CLIENT_ID="client id for discord bot"
OAUTH_DISCORD_CLIENT_SECRET="client secret for discord bot"
DISCORD_BOT_TOKEN="token for discord bot"
DISCORD_ROLE_ID="Specify the id of the role created in discord setup"
DISCORD_SERVER_ID="Specify the id of the server created in discord setup"
SYMBOL_MOSAIC_ID="Specify the id of the mosaic that will be granted access to the channel"
SYMBOL_ADMIN_PRIVATE_KEY="Specify private key for new Symbol account"
SYMBOL_ADMIN_PUBLIC_KEY="Specify public key for new Symbol account"
NEXT_PUBLIC_URL="http://${your-domain}";
SYMBOL_NETWORK_TYPE="production = 104 development 152"
SYMBOL_NODE_URL="http://${node-domain}:3001"
TZ=UTC
```

以下の手順で起動することができます。

```shell
npm run build
npm run start
```

## optional: deploy by container

docker container も公開しています。以下にてコンテナを取得し、環境変数を指定の上起動して下さい

```sh
docker pull ghcr.io/ymuichiro/mosaic-authz:latest
```
