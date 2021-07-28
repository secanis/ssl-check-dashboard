<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
        <Header
            :state="{
                ...this.getState,
                connectState: this.socketState,
            }"
            :errors="getErrors"
        />
        <div v-if="socketState !== 'connected'">
            <socket-status :status="socketStatus"></socket-status>
        </div>
        <SslList :sslData="getData" class="flex-grow" />
        <Footer />
    </div>
</template>

<script lang="ts">
import { Component, namespace, Provide, Vue } from 'nuxt-property-decorator';
import { SslCheck, SslError, State } from '../../server/src/types';
import SocketStatus from 'nuxt-socket-io/components/SocketStatus.vue';

const cacheModule = namespace('cache');

@Component({
    name: 'Index',
    components: {
        SocketStatus,
    },
})
export default class Index extends Vue {
    @cacheModule.Getter('data')
    private getData!: () => SslCheck[];

    @cacheModule.Getter('state')
    private getState!: () => State;

    @cacheModule.Getter('sslerrors')
    private getErrors!: () => SslError[];

    @cacheModule.Getter('socketState')
    private socketState!: () => string;

    @cacheModule.State('_socketState')
    private _socketState!: string;

    @cacheModule.Action
    private setSocketState!: (state: string) => Promise<void>;

    @Provide() socketStatus: any = {};

    constructor() {
        super();

        const socket = this.$nuxtSocket({
            name: 'sslcache',
            statusProp: 'socketStatus',
            vuex: {
                actions: [
                    {
                        data: 'cache/setData',
                    },
                    {
                        queuestate: 'cache/setQueueState',
                    },
                    {
                        sslerrors: 'cache/setErrors',
                    },
                ],
            },
        });

        socket.on('connect', () => this.setSocketState('connected'));
        socket.on('disconnect', async () => {
            this.setSocketState('disconnected');
            if (this._socketState !== 'connected') location.reload();
        });

        socket.emit('events');
    }
}
</script>
