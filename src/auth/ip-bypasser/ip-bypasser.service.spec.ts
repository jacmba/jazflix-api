import { Test, TestingModule } from '@nestjs/testing';
import { IpBypasserService } from './ip-bypasser.service';

describe('IpBypasserService', () => {
  let service: IpBypasserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IpBypasserService,
        {
          provide: 'ALLOWED_IPS_LIST',
          useValue: ['1.1.1.1'],
        },
      ],
    }).compile();

    service = module.get<IpBypasserService>(IpBypasserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.getAllowedIps().length).toBe(1);
    expect(service.getAllowedIps()[0]).toBe('1.1.1.1');
  });

  it('should bypass for IP 1.1.1.1', () => {
    const bypass: boolean = service.bypass('1.1.1.1');
    expect(bypass).toBeTruthy();
  });

  it('bypass should fail for IP 2.2.2.2', () => {
    const bypass: boolean = service.bypass('2.2.2.2');
    expect(bypass).toBeFalsy();
  });
});
