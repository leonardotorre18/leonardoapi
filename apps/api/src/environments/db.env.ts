import { registerAs } from '@nestjs/config';

export default registerAs(
  'db',
  () => {
    return {
      url: process.env.DATABASE_URL
    };
  }
)