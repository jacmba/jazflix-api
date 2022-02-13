import { Controller, Get, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import SectionDto from '../model/dto/section.dto';
import { AuthGuard } from '../auth/auth-guard';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@Controller('sections')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Sections')
@ApiExtraModels(SectionDto)
export class SectionsController {
  constructor(private readonly service: SectionsService) {}

  @Get()
  @ApiOperation({
    summary: 'Site sections endpoint',
    description: 'Sections or categories provided for site navigation',
  })
  @ApiOkResponse({
    description: 'List of available site sections',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(SectionDto) },
    },
  })
  getSections(): Promise<SectionDto[]> {
    return this.service.find();
  }
}
