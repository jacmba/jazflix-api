import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Section from '../model/entity/section.entity';
import SectionDto from '../model/dto/section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private readonly repo: Repository<Section>,
  ) {}

  async find(): Promise<SectionDto[]> {
    const sections = await this.repo.find();

    return sections
      .sort((a, b) => a.order - b.order)
      .map(
        (s: Section): SectionDto => ({
          title: s.title,
          icon: s.icon,
          to: s.to,
        }),
      );
  }
}
