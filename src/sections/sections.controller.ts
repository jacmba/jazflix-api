import { Controller, Get } from '@nestjs/common';
import { SectionsService } from './sections.service';
import SectionDto from '../model/dto/section.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly service: SectionsService) {}

  @Get()
  getSections(): Promise<SectionDto[]> {
    return this.service.find();
  }
}
