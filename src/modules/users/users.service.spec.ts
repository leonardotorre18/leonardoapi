import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Role } from '../auth/enums/role.enum';

describe('UsersService', () => {
  let service: UsersService;
  const mockUsers: any[] = []
  const mockUserRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation(user => {
      const savedUser = {
        ...user,
        id: mockUsers.length
      }
      mockUsers.push(savedUser)
      return savedUser
    }),
    findById: jest.fn().mockImplementation((id) => {
      const result = mockUsers.find(user => user.id == id)
      return result ?? null
    }),
    findOne: jest.fn().mockResolvedValue(null),
  };
  const userExample = {
    email: 'example@domain.com',
    password: '123',
    roles: [Role.USER]
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken(User.name),
        useValue: mockUserRepository,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await service.findAll()
    expect(result).toEqual(mockUsers)
  })

  it('should create user', async () => {
    const result = await service.create(userExample)
    expect(result).toEqual({
      ...userExample,
      id: expect.any(Number)
    })
  })

  it('should find user by id', async () => {
    const result = await service.findById(mockUsers[0].id)
    expect(result).toEqual(mockUsers[0])
  })

});
