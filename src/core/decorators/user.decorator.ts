import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((req, data) => {
  return Array.isArray(data) ? data[2].req.user : data.user;
});
