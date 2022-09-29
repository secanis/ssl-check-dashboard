import { Injectable } from '@angular/core';

import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { AuthRepository } from 'src/app/state/auth.repository';
import { DataRepository } from 'src/app/state/data.repository';
import { SslCheck, SslError, State } from '../../../../../server/src/types';
import { getUrlConfig } from '../url';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(
    private authRepo: AuthRepository,
    private dataRepo: DataRepository
  ) {}

  createAsync(token: string) {
    // socket io config
    const { BASE_API_PATH, WS_URL } = getUrlConfig();

    const socketConfig: SocketIoConfig = {
      url: WS_URL,
      options: {
        path: `${BASE_API_PATH}/ws`,
        extraHeaders: {
          Authorization: `Baerer ${token}`,
        },
      },
    };

    const socket = new Socket(socketConfig);

    socket.on('connect', () => {
      socket.emit('events');
    });
    socket.on('conerr', (e: any) => {
      if (e && e.code === 401) this.authRepo.logout();
      socket.disconnect();
    });

    socket.on('data', (res: SslCheck[]) => {
      this.dataRepo.setSslData(res);
    });

    socket.on('sslerrors', (res: SslError[]) => {
      this.dataRepo.setErrorData(res);
    });

    socket.on('queuestate', (res: State) => {
      this.dataRepo.setState({ ...res, connected: socket.ioSocket.connected });
    });

    return socket;
  }
}
