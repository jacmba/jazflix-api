import { Controller, Get, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import SectionDto from '../model/dto/section.dto';
import { AuthGuard } from '../auth/auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('sections')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SectionsController {
  constructor(private readonly service: SectionsService) {}

  @Get()
  getSections(): Promise<SectionDto[]> {
    return this.service.find();
  }
}
