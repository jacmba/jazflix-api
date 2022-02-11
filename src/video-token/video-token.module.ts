import { Module } from '@nestjs/common';
import { VideoTokenSigner } from './video-token-signer';
import { VideoTokenHasher } from './video-token-hasher';
import { VideoTokenValidator } from './video-token-validator';

@Module({
  providers: [VideoTokenSigner, VideoTokenHasher, VideoTokenValidator],
})
export class VideoTokenModule {}
