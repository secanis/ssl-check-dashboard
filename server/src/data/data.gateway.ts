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
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
    cors: { origin: '*' },
    path: WS_PATH,
})
export class DataGateway implements OnGatewayInit, OnGatewayConnection {
    constructor(
        private readonly dataService: DataService,
        private readonly authService: AuthService,
    ) {}

    @WebSocketServer()
    server: Server = new Server();

    private logger: Logger = new Logger('AppGateway');

    afterInit() {
        this.logger.log('socket initialized');
        this.dataService.socket = this.server;
    }

    async handleConnection(client: Socket, ...args: any[]) {
        const shouldConnect = this.checkAuthorization(client);
        if (shouldConnect) {
            this.dataService.emitState();
            this.dataService.emitErrors();
            this.logger.debug(`client connected: ${client.id}`);
        }
    }

    @SubscribeMessage('events')
    async handleSslDataEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): Promise<void> {
        this.checkAuthorization(client);
        this.dataService.emitState();
        await this.dataService.emitData();
    }

    private checkAuthorization(client: Socket): boolean {
        const authHeader = client.handshake.headers.authorization;
        const errMessage = {
            error: 'not authenticated',
            code: 401,
        };

        if (!authHeader) {
            client.emit('conerr', errMessage);
            client.disconnect();
            return false;
        }
        const isAuthorized = this.authService.verify(authHeader);
        if (!isAuthorized) {
            client.emit('conerr', errMessage);
            client.disconnect();
            return false;
        }

        return isAuthorized;
    }
}
