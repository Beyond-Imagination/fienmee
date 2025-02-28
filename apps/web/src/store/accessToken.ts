import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type CredentialStore = {
    accessToken: string
    expiresAt: Date
    setCredential: (accessToken: string, expiresAt: Date) => void
}

export const credentialStore = create<CredentialStore>()(
    persist(
        set => ({
            accessToken: '',
            expiresAt: new Date(),
            setCredential: (accessToken: string, expiresAt: Date) => set({ accessToken: accessToken, expiresAt: expiresAt }),
        }),
        {
            name: 'access-token-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)
