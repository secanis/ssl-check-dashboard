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
import { Server, Socket } from 'socket.io';

import { DataService } from './data.service';
import { WS_PATH } from '../types';

@WebSocketGateway({
    cors: { origin: '*' },
    path: WS_PATH,
})
export class DataGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(private readonly dataService: DataService) {}

    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    afterInit() {
        this.logger.log('socket initialized');
        this.dataService.socket = this.server;
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.dataService.emitState();
        this.dataService.emitErrors();
        this.logger.debug(`client connected: ${client.id}`);
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
