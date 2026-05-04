// src/projects/projects.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService, CreateProjectDto } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // GET /projects — ambil proyek yang visible (dipanggil frontend)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  // GET /projects/admin — semua proyek termasuk yang hidden
  @Get('admin')
  findAllAdmin() {
    return this.projectsService.findAllAdmin();
  }

  // GET /projects/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  // POST /projects — tambah proyek baru
  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  // PATCH /projects/:id — update proyek
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateProjectDto>,
  ) {
    return this.projectsService.update(id, dto);
  }

  // PATCH /projects/:id/visibility — toggle tampil/sembunyikan
  @Patch(':id/visibility')
  toggleVisibility(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.toggleVisibility(id);
  }

  // POST /projects/reorder — update urutan
  @Post('reorder')
  reorder(@Body('ids') ids: number[]) {
    return this.projectsService.reorder(ids);
  }

  // DELETE /projects/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}
