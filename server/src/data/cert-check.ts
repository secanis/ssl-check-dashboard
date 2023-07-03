import * as https from 'https';
import validator from 'validator';
import { SslCheck, SslCheckState } from '../types';

const getDaysBetween = (validFrom: Date, validTo: Date) => {
    return Math.round(Math.abs(+validFrom - +validTo) / 8.64e7);
};

const getDaysRemaining = (validFrom: Date, validTo: Date) => {
    const daysRemaining = getDaysBetween(validFrom, validTo);
    if (new Date(validTo).getTime() < new Date().getTime()) {
        return -daysRemaining;
    }
    return daysRemaining;
};

const getAltNames = (crt: any): string[] => {
    if (crt.subjectaltname)
        return crt.subjectaltname
            .split(', ')
            .map((i: any) => i.replace('DNS:', ''));

    return [crt.subject.CN];
};

export const getSSLCertificateInfo = (host: string): Promise<SslCheck> => {
    if (!validator.isFQDN(host)) {
        throw new Error('Invalid hostname');
    }
    const options = {
        agent: false,
        method: 'HEAD',
        port: 443,
        rejectUnauthorized: false,
        hostname: host,
    };

    return new Promise((resolve, reject) => {
        try {
            const req = https.request(options, (res: any) => {
                const crt = res.connection.getPeerCertificate(),
                    vFrom = crt.valid_from,
                    vTo = crt.valid_to,
                    altName = getAltNames(crt);
                const validTo = new Date(vTo);
                const cipher = res.connection.getCipher();
                resolve({
                    id: host,
                    host: host,
                    state: SslCheckState.PROCESSING,
                    message: '',
                    valid: res.socket.authorized || false,
                    validationError: res.socket.authorizationError || null,
                    validFrom: new Date(vFrom).toISOString(),
                    validTo: validTo.toISOString(),
                    daysRemaining: getDaysRemaining(new Date(), validTo),
                    validFor: altName,
                    usedCipher: { name: cipher, version: cipher.version },
                });
            });
            req.on('error', reject);
            req.end();
        } catch (e) {
            reject(e);
        }
    });
};
