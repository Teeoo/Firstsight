import { createParamDecorator } from '@nestjs/common'

export const AuthUser = createParamDecorator((_req, data) => {
  return data[2].req.user ?? data.user
})
