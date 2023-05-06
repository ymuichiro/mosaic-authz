/**
 * declare of environment variables
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly OAUTH_DISCORD_CLIENT_ID: string;
    readonly OAUTH_DISCORD_CLIENT_SECRET: string;
    readonly DISCORD_BOT_TOKEN: string;
    readonly DISCORD_ROLE_ID: string;
    readonly DISCORD_SERVER_ID: string;
    readonly SYMBOL_MOSAIC_ID: string;
    readonly SYMBOL_ADMIN_PRIVATE_KEY: string;
    readonly SYMBOL_ADMIN_PUBLIC_KEY: string;
    readonly NEXTAUTH_URL: string;
    readonly NEXTAUTH_SECRET: string;
    readonly SYMBOL_NETWORK_TYPE: string;
    readonly SYMBOL_NODE_URL: string;
    readonly TZ: string;
  }
}
