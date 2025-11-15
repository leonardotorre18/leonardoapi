import { Test } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  let guard: RolesGuard
  const mockReflector = {
    getAllAndOverride: jest.fn(),
    get: jest.fn(),
  }
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();
    guard = module.get<RolesGuard>(RolesGuard);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
