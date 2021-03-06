import { Injectable } from '@nestjs/common';
import VideoDto from '../model/dto/video.dto';
import FileConfig from '../config/file.config';
import { createReadStream, statSync } from 'fs';

const CHUNK_SIZE = 10 ** 6;

@Injectable()
export default class VideoLoader {
  load(name: string, a: number | undefined, b: number | undefined): VideoDto {
    const filePath = FileConfig.DIRECTORY + '/' + name;
    const stat = statSync(filePath);
    const start = a || 0;
    const end = b || Math.min(start + CHUNK_SIZE, stat.size - 1);
    const size = end - start + 1;
    const stream = createReadStream(filePath, { start, end });

    return {
      size,
      stream,
      totalSize: stat.size,
      end,
    };
  }
}
