import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DashboardController {
    @Get('/')
    @Render('Dashboard')
    async dashboard() {
        return;
    }
}
