import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export const WS_PATH = '/api/ws';

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

export interface SslError {
    host: string;
    message: string;
}
