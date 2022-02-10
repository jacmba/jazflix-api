import { Module } from '@nestjs/common';
import { VideoTokenSigner } from './video-token-signer';
import { VideoTokenHasher } from './video-token-hasher';

@Module({
  providers: [VideoTokenSigner, VideoTokenHasher],
})
export class VideoTokenModule {}
