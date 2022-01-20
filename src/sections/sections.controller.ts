import { Controller, Get } from '@nestjs/common';
import Section from '../model/section.entity';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly service: SectionsService) {}

  @Get()
  getSections(): Promise<Section[]> {
    return this.service.find();
  }
}
