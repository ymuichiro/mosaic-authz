# Setup discord

discord 側の設定方法を以下に示します

## Create a discord bot

認証時にユーザーへチャンネルへのアクセス権限を自動的に付与する為に discord の bot を利用します。事前に以下手順に従い bot を用意して下さい

1. [discord developer portal](https://discord.com/developers/applications) へアクセスします
2. "New Application" を押し、 bot を作成して下さい
3. 名前等、基本的な情報を入力して下さい
4. client id と client secret を保管しておいて下さい
5. OAuth2 タブへ移動し、以下の通り操作を行なって下さい
   1. "Redirects" へ `https://${your-domain}/api/auth/callback/discord` と入力します
6. Bot タブへ移動し、以下の通り操作を行なって下さい
   1. "Token" を保管しておいて下さい
   2. "SERVER MEMBERS INTENT" を true にします
7. 設定を保存します

bot の作成が完了したら discord server にインストールします。以下の URL にアクセスし、 作成した bot をインストールして下さい。

`https://discord.com/api/oauth2/authorize?client_id=${your-client-id}&permissions=268435488&redirect_uri=${your-base64-redirects-uri}&response_type=code&scope=identify%20bot`

上記、インストールで必要とする権限は次の通りです。

- scopes
  - identify
  - bot
- permissions
  - Manage Server
  - Manage Role

これにて discord bot の用意は完了です。bot のアイコン等は任意の画像等を設定して下さい。

## Create a discord private channel

指定の mosaic を保有していなければアクセスできない discord channel を作成します。以下の手順に従って下さい。

1. discord の環境設定より "開発者モード" を有効にします
2. 新しいロールを discord server で作成します
3. 作成したロールを右クリックし、ロールの id を保管しておいてください
4. プライベートチャンネルを対象のサーバーで作成する
5. 作成したチャンネルの設定を開き、"権限" タブにて作成したロールにアクセス権限を付与して下さい

上記にて discord 側の準備は完了です。
