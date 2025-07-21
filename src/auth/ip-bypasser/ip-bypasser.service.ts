import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class IpBypasserService {
  private readonly logger = new Logger(IpBypasserService.name);

  constructor(
    @Inject('ALLOWED_IPS_LIST') private readonly allowedIps: string[],
  ) {
    this.logger.debug(
      'Allowed bypass IPS: ' + JSON.stringify(allowedIps, null, 2),
    );
  }

  getAllowedIps(): string[] {
    return this.allowedIps;
  }

  bypass(ip: string): boolean {
    this.logger.verbose('Check IP bypass: ' + ip);
    return true; // this.allowedIps.includes(ip);
  }
}
