import { Test, TestingModule } from '@nestjs/testing';
import { UnixsocketService } from './unixsocket.service';

describe('UnixsocketService', () => {
  let service: UnixsocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnixsocketService],
    }).compile();

    service = module.get<UnixsocketService>(UnixsocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
