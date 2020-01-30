import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
  it('should be defined', () => {
    expect(new AuthorizationGuard()).toBeDefined();
  });
});
