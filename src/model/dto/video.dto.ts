import { ReadStream } from 'fs';

export default class VideoDto {
  size: number;
  stream: ReadStream;
  totalSize?: number;
  end?: number;
}
