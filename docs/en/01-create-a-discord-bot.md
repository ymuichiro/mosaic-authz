# Setup discord

The following is how to set up the discord side

## Create a discord bot

We will use discord's bot to automatically grant access to channels to users at the time of authentication. Please follow the steps below to prepare your bot in advance

1. Access to [discord developer portal](https://discord.com/developers/applications)
2. Press "New Application" to create a bot
3. Please enter your name and other basic information
4. Keep client id and client secret
5. Go to the OAuth2 tab and do the following
   1. Enter `https://${your-domain}/api/auth/callback/discord` to "Redirects"
6. Go to the Bot tab and do the following
   1. Please keep the "Token."
   2. "SERVER MEMBERS INTENT" is set to true
7. Save settings

After the bot creation is complete, install it on the discord server. Access the following URL and install the bot you have created.

`https://discord.com/api/oauth2/authorize?client_id=${your-client-id}&permissions=268435488&redirect_uri=${your-base64-redirects-uri}&response_type=code&scope=identify%20bot`

Above, the permissions required for installation are as follows

- scopes
  - identify
  - bot
- permissions
  - Manage Server
  - Manage Role

Now the discord bot is ready, and you can set an arbitrary image for the bot.

## Create a discord private channel

Create a discord channel that cannot be accessed without holding the specified mosaic. Follow these steps

1. Enable "developer mode" in discord preferences
2. Create a new role on the discord server
3. Right-click on the role you created and keep the role's id
4. Create a private channel on the target server
5. Open the settings of the created channel and grant access to the created role in the "Permissions" tab.

The discord side preparation is complete.
