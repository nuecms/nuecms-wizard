import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';

describe('File path creation with path.join()', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Ensure no stale mocks interfere
  });

  const isWindows = process.platform === 'win32'; // Determine if the OS is Windows

  // Test with relative paths
  it('should correctly join the current working directory and the relative path (data/config.ts)', () => {
    const cwd = isWindows
      ? 'C:\\Users\\YourName\\your-project'
      : '/Users/YourName/your-project';
    const expectedPath = isWindows
      ? 'C:\\Users\\YourName\\your-project\\data\\config.ts'
      : '/Users/YourName/your-project/data/config.ts';

    vi.stubGlobal('process', {
      cwd: vi.fn(() => cwd),
    });

    const filePath = path.join(process.cwd(), 'data/config.ts');
    expect(filePath).toBe(expectedPath);
  });

  // Test with absolute-like paths
  it('should correctly join the current working directory and the absolute path (/data/config.ts)', () => {
    const cwd = isWindows
      ? 'C:\\Users\\YourName\\your-project'
      : '/Users/YourName/your-project';
    const expectedPath = isWindows
      ? 'C:\\Users\\YourName\\your-project\\data\\config.ts'
      : '/Users/YourName/your-project/data/config.ts';

    vi.stubGlobal('process', {
      cwd: vi.fn(() => cwd),
    });

    const filePath = path.join(process.cwd(), '/data/config.ts');
    expect(filePath).toBe(expectedPath);
  });
});
