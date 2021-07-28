import { Socket } from 'dgram';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

import { DataService } from './data.service';
import { WS_PATH, WS_NAMESPACE } from '../types';

@WebSocketGateway({
    cors: { origin: '*' },
    path: WS_PATH,
    namespace: WS_NAMESPACE,
})
export class DataGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(private readonly dataService: DataService) {}

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    afterInit() {
        this.logger.debug('socket initialized');
        this.dataService.socket = this.server;
    }

    handleConnection(client: any, ...args: any[]) {
        this.dataService.emitState();
        this.dataService.emitErrors();
    }

    @SubscribeMessage('events')
    async handleSslDataEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket
    ): Promise<void> {
        this.dataService.emitState();
        await this.dataService.emitData();
    }
}
