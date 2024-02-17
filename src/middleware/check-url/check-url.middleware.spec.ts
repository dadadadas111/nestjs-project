import { CheckUrlMiddleware } from './check-url.middleware';

describe('CheckUrlMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckUrlMiddleware()).toBeDefined();
  });
});
