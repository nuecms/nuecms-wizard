import { describe, it, expect, vi } from 'vitest';
import path from 'path';

describe('File path creation with path.join()', () => {
  // test windows with data/config.ts
  it('should correctly join the current working directory and the relative path, windows with data/config.ts', () => {
    // Mock process.cwd() to simulate a directory
    vi.stubGlobal('process', {
      cwd: vi.fn(() => 'C:\\Users\\YourName\\your-project'),
    });

    const filePath = path.join(process.cwd(), 'data/config.ts');

    // Check that the path is correctly joined
    expect(filePath).toBe('C:\\Users\\YourName\\your-project\\data\\config.ts');
  })
  // test windows with /data/config.ts
  it('should correctly join the current working directory and the relative path,  windows with /data/config.ts', () => {
    // Mock process.cwd() to simulate a directory
    vi.stubGlobal('process', {
      cwd: vi.fn(() => 'C:\\Users\\YourName\\your-project'),
    });

    const filePath = path.join(process.cwd(), '/data/config.ts');
    // Check that the path is correctly joined
    expect(filePath).toBe('C:\\Users\\YourName\\your-project\\data\\config.ts');
  })

  // test unix with data/config.ts
  it('should correctly join the current working directory and the relative path, unix with data/config.ts', () => {
    // Mock process.cwd() to simulate a directory
    vi.stubGlobal('process', {
      cwd: vi.fn(() => '/Users/YourName/your-project'),
    });

    const filePath = path.join(process.cwd(), 'data/config.ts');

    // Check that the path is correctly joined
    expect(filePath).toBe('/Users/YourName/your-project/data/config.ts');
  });

  // test unix with /data/config.ts
  it('should correctly join the current working directory and the relative path, unix with /data/config.ts', () => {
    // Mock process.cwd() to simulate a directory
    vi.stubGlobal('process', {
      cwd: vi.fn(() => '/Users/YourName/your-project'),
    });

    const filePath = path.join(process.cwd(), '/data/config.ts');

    // Check that the path is correctly joined
    expect(filePath).toBe('/Users/YourName/your-project/data/config.ts');
  });
});
