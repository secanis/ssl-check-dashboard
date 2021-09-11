import { Controller, Get } from '@nestjs/common';
import projectVersion from 'project-version';

@Controller()
export class HealthController {
    @Get('/health')
    async halth() {
        return {
            health: 'running',
            version: projectVersion,
        };
    }
}
