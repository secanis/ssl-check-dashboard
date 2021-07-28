// store/counter.ts
import { createModule, mutation, action } from 'vuex-class-component';
import { SslCheck, State } from '../../server/src/types';
import { SslError } from '../../server/src/types';

const VuexModule = createModule({
    namespaced: 'cache',
    strict: false,
    target: 'nuxt',
});

export default class Cache extends VuexModule {
    // state
    private _data: SslCheck[] = [];
    private _state: State = { queue: -1, processing: -1 };
    private _sslerrors: SslError[] = [];
    private _socketState: string = 'disconnected';

    // getters
    get data(): SslCheck[] {
        return this._data;
    }
    get state(): State {
        return this._state;
    }
    get sslerrors(): SslError[] {
        return this._sslerrors;
    }
    get socketState(): string {
        return this._socketState;
    }

    // mutations
    @mutation
    public replaceData(newData: SslCheck[]) {
        this._data = newData;
    }

    // actions
    @action
    public async setData(newData: SslCheck[]): Promise<void> {
        const data = newData.map((d) => ({
            ...d,
            validFrom: formatDate(d.validFrom),
            validTo: formatDate(d.validTo),
        }));

        this.replaceData(data);
    }

    @action
    public async setQueueState(newState: State): Promise<void> {
        this._state = newState;
    }

    @action
    public async setErrors(errors: SslError[]): Promise<void> {
        this._sslerrors = Array.isArray(errors) ? errors : [];
    }

    @action
    public async setSocketState(state: string): Promise<void> {
        this._socketState = state;
    }
}

function formatDate(date: string): string {
    return new Date(date)
        .toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        .replace(/ /g, '-');
}
