import type { ClientUser, SanitizedPermissions, TypedUser } from 'payload';
import React from 'react';
export type UserWithToken<T = ClientUser> = {
    /** seconds until expiration */
    exp: number;
    token: string;
    user: T;
};
export type AuthContext<T = ClientUser> = {
    fetchFullUser: () => Promise<null | TypedUser>;
    logOut: () => Promise<boolean>;
    permissions?: SanitizedPermissions;
    refreshCookie: (forceRefresh?: boolean) => void;
    refreshCookieAsync: () => Promise<ClientUser>;
    refreshPermissions: () => Promise<void>;
    setPermissions: (permissions: SanitizedPermissions) => void;
    setUser: (user: null | UserWithToken<T>) => void;
    strategy?: string;
    token?: string;
    tokenExpirationMs?: number;
    user?: null | T;
};
type Props = {
    children: React.ReactNode;
    permissions?: SanitizedPermissions;
    user?: ClientUser | null;
};
export declare function AuthProvider({ children, permissions: initialPermissions, user: initialUser, }: Props): React.JSX.Element;
export declare const useAuth: <T = ClientUser>() => AuthContext<T>;
export {};
//# sourceMappingURL=index.d.ts.map