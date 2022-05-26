import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export const BASE_API_PATH = '/api';
export const WS_PATH = `${BASE_API_PATH}/ws`;

export interface SslCheck extends InMemoryDBEntity {
    host: string;
    state: SslCheckState;
    message: string;
    valid: boolean;
    validFrom: string;
    validTo: string;
    daysRemaining: number;
    validFor: string[];
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
    host: string;
    message: string;
}

export interface UserStore {
    token: string;
    error: string;
}

export type User = {
    userId: string;
    username: string;
    password: string;
    salt?: string;
};
