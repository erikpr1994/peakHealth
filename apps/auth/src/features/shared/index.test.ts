import { describe, it, expect } from 'vitest';

import {
  AuthCard,
  FormGroup,
  Input,
  Button,
  Divider,
  Link,
  BackButton,
} from './index';

describe('shared/index', (): void => {
  it('exports all required components', (): void => {
    expect(AuthCard).toBeDefined();
    expect(FormGroup).toBeDefined();
    expect(Input).toBeDefined();
    expect(Button).toBeDefined();
    expect(Divider).toBeDefined();
    expect(Link).toBeDefined();
    expect(BackButton).toBeDefined();
  });
});
