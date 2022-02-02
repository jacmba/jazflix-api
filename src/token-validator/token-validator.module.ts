import { Module } from '@nestjs/common';
import { TokenValidatorService } from './token-validator.service';

@Module({
  providers: [TokenValidatorService],
})
export class TokenValidatorModule {}
