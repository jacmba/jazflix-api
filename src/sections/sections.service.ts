import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Section from '../model/section.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private readonly repo: Repository<Section>,
  ) {}

  find(): Promise<Section[]> {
    return this.repo.find();
  }
}
