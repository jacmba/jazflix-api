import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionsController } from './sections.controller';
import Section from '../model/entity/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionsService],
  controllers: [SectionsController],
})
export class SectionsModule {}
