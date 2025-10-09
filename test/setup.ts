// Test setup file to handle proper cleanup and prevent memory leaks
import { Logger } from '@nestjs/common';

// Set reasonable max listeners to prevent actual memory leaks
process.setMaxListeners(50);

// Global test timeout
jest.setTimeout(60000);

// Cleanup after all tests
afterAll(async () => {
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
  
  // Clear all timers
  jest.clearAllTimers();
  
  // Remove all listeners from process and console
  process.removeAllListeners();
  if (process.stdout && process.stdout.removeAllListeners) {
    process.stdout.removeAllListeners();
  }
  if (process.stderr && process.stderr.removeAllListeners) {
    process.stderr.removeAllListeners();
  }
  
  // Wait for cleanup
  await new Promise(resolve => setTimeout(resolve, 500));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});


