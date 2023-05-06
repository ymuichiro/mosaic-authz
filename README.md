
![GitHub Actions Status](https://img.shields.io/github/actions/workflow/status/ymuichiro/mosaic-authz/build.yaml)
![License](https://img.shields.io/github/license/ymuichiro/mosaic-authz)


# mosaic authz

![logo](/assets/logo/logo-wide-dark.png#gh-dark-mode-only)
![logo](/assets/logo/logo-wide-dark.png#gh-light-mode-only)

## Introduction

This is an authentication solution that leverages the Blockchain Symbol's Mosaic, allowing each channel of the discord to be built as a channel that can only be accessed by users with membership cards.
This authentication solution allows you to manage your discord community in a secure and efficient way. It is possible to restrict who can access a channel, as users without the specified Mosaic, a membership card, cannot attempt to gain unauthorized access.

## Infrastructure

The mosaic authz must be set up as a web server separate from the discord. symbol node can be connected to an already public node, or you can set up a new dedicated node by yourself.

* [symbol node list](https://symbol-tools.com/symbolTools/view/tool/nodeList.html)
* [how to build symbol node](https://symbol-community.com/docs/6)

```mermaid
flowchart LR
    A(user) --> discord
    A(user) --> auth-server
    subgraph discord
        direction TB
        B(channel A)
        C(channel B)
        G(discord bot) --> B
        G(discord bot) --> C
    end
    subgraph auth-server
        subgraph mosaic-authz
            D(frontend: next.js)
            E(backend api: next.js)
        end
    end
    subgraph symbol
        F(node)
    end
    auth-server --> F
```

## Auth Flow

This solution is started separately from discord, and after discord oauth authentication, it verifies whether or not the specified mosaic is owned. The flow of authentication is shown below.

1. user joins the discord server
2. access to the authentication server by following the URL for authentication 3. discord oauth login on the authentication server
3. discord oauth login on the authentication server 4. then create an encrypted message with Blockchain Wallet and send it to the backend of the authentication server
4. then create an encrypted message in Blockchain Wallet and send it to the backend of the authentication server 5.
5. composite the encrypted message on the backend to prove possession of the private key
6. Verify ownership of the specific TOKEN using the user's public key information
7. If possession of the specified TOKEN is confirmed, discord bot grants ROLE based on discord login information
8. start access to the channel that only the user who owns the ROLE can access

```mermaid
flowchart LR
    subgraph user
        direction TB
        G(browser) <-->|3. get active public key| H(SSS Extention)
        G <-->|4. encrypted message| H
    end

    subgraph system
        direction TB
        subgraph mosaic-authz
            direction LR
            subgraph auth-server
                E(web server)
            end
            subgraph symbol
                I(node)
            end
        end
        subgraph discord
            B(discord server) -.- C(open channnel A)
            B -.-|authentication required| D(private channnel B)
        end
    end
    user -->|1. access| auth-server
    user -->|2. discord oauth| auth-server
    user -->|5. send encrypted message| auth-server
    E -->|6. check blockchain account mosaic balance| I
    B -->|7. get discord account id| E
    E -->|8. set role to discord account| B
    user --> |9. access to private channel| B
```

```mermaid
sequenceDiagram
    box Discord Auth Flow by Mosaic
    actor U AS User
    participant D as Discord
    participant A as Auth Server
    end

    U->>D: First Access
    U->>A: Redirect to auth server
    U->>A: Discord OAuth Login && send encrypted message by symbol
    A->>A: decrypt message & Confirm possession of private key
    A->>A: Check Mosaic Possession
    A->>A: GET Discord UserID
    A->>U: if ok = SET Discord ROLE
    U->>D: Access to closed channel
```

## Quick Start

Below are the steps to use mosaic authz. There are two options for launching the application: build it yourself or use a docker container.

1. [Create a discord BOT](./docs/en/01-create-a-discord-bot.md)
2. [Deploy mosaic authz](./docs/en/02-mosaic-authz-deploy-build.md)

## Links

- [mosaic-authz-ja](./docs/ja/)
- [Symbol Community Web](https://symbol-community.com/)
