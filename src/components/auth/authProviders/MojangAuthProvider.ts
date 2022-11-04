import {
    AbstractAuthProvider,
    AbstractAuthProviderConfig,
    AuthResponseData,
    HttpHelper,
} from "@root/utils"

export class MojangAuthProvider extends AbstractAuthProvider {
    protected static readonly type = "mojang"

    private authHost =
        (<MojangAuthProviderConfig>this.configManager.config.auth).authHost ||
        "https://authserver.mojang.com"

    async auth(username: string, password: string): Promise<AuthResponseData> {
        const result = await HttpHelper.postJson<AuthenticateResponse>(
            new URL("authenticate", this.authHost),
            {
                agent: {
                    name: "Minecraft",
                    version: 1,
                },
                username,
                password,
            }
        )

        return {
            username: result.selectedProfile.name,
            userUUID: result.selectedProfile.id,
            accessToken: result.accessToken,
        }
    }

    join(): any {
        return // Doesn't need implementation
    }

    hasJoined(): any {
        return // Doesn't need implementation
    }

    profile(): any {
        return // Doesn't need implementation
    }

    privileges(): any {
        return // Doesn't need implementation
    }

    profiles(): any {
        return // Doesn't need implementation
    }
}

export interface MojangAuthProviderConfig extends AbstractAuthProviderConfig {
    authHost: string
    accountHost: string
    sessionHost: string
    servicesHost: string
}

interface AuthenticateResponse {
    user: {
        username: string
        properties: {
            name: string
            value: string
        }[]
        id: string
    }
    clientToken: string
    accessToken: string
    availableProfiles: [
        {
            name: string
            id: string
        }
    ]
    selectedProfile: {
        name: string
        id: string
    }
}
