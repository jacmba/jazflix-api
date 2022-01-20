import { Injectable } from '@nestjs/common';
import VideoDto from '../model/dto/video.dto';
import FileConfig from '../config/file.config';
import { createReadStream, statSync } from 'fs';

@Injectable()
export default class VideoLoader {
  load(name: string): VideoDto {
    const filePath = FileConfig.DIRECTORY + '/' + name;
    const stat = statSync(filePath);
    const stream = createReadStream(filePath);

    return {
      size: stat.size,
      stream,
    };
  }
}
