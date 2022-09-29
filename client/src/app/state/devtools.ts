import { devTools } from '@ngneat/elf-devtools';
import { environment } from 'src/environments/environment';

export function startDevtools() {
  if (!environment.production) {
    console.info('Starting devtools');
    devTools();
  }
}
