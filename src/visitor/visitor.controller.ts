// src/visitor/visitor.controller.ts
import { Controller, Post, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { VisitorService } from './visitor.service';

@Controller('visitors')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  // POST /visitors — dicall frontend saat halaman dibuka
  @Post()
  @HttpCode(HttpStatus.OK)
  record() {
    return this.visitorService.recordVisit();
  }

  // GET /visitors/stats — statistik untuk admin
  @Get('stats')
  stats() {
    return this.visitorService.getStats();
  }
}
