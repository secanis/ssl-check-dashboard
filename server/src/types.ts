export const BASE_API_PATH = '/api';
export const WS_PATH = `${BASE_API_PATH}/ws`;

// manually added @nestjs-addons/in-memory-db InMemoryDBIdentity
// interface to avoid import errors with the client - not great but does the job
interface InMemoryDBEntity {
    id: string;
}

export interface SslCheck extends InMemoryDBEntity {
    host: string;
    state: SslCheckState;
    message: string;
    valid: boolean;
    validationError: string | null;
    validFrom: string;
    validTo: string;
    daysRemaining: number;
    validFor: string[];
    usedCipher: {
        name?: { name?: string; standardName?: string; version?: string };
        version?: string;
    };
}

export enum SslCheckState {
    OK = 'ok',
    PROCESSING = 'processing',
    ERROR = 'error',
}

export interface State {
    queue: number;
    processing: number;
    connected?: boolean;
}

export interface AppState {
    minified: boolean;
}

export interface SslError {
    id: string;
    host: string;
    message: string;
}

export interface UserStore {
    token: string;
    error: string;
    errorMsg?: string;
}

export type User = {
    userId: string;
    username: string;
    password: string;
    salt?: string;
};
