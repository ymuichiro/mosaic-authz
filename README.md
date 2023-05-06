# Template Next ORM

Templates for the following configurations are available.

- Next.js
- Next-Auth
- mui-material
- Prisma
- Open API Specification

## 機能

Discord で OAuth2 認証を確認後、かつ SSS Extention での秘密鍵の所有を証明した上で、
特定 Mosaic の所有があれば指定されたロールを付与する discord application.

前提として、Mosaic を手放した際のロール剥奪機能は未実装。別途 Cron を実行し、定期的に Mosaic の所有を監視する必要を要する。

## discord permissions

[console](https://discord.com/developers/applications)

### Bot install

- OAUTH Scope
  - bot
- Bot Permissions
  - Manage Role

### User OAuth

- OAUTH Scope
  - identify
