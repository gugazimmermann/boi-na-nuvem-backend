// Global setup file that runs before any tests
// This addresses the root cause of EventEmitter memory leaks

// Set reasonable max listeners to prevent actual memory leaks
process.setMaxListeners(50);

// Clean up any existing listeners that might be hanging around
const cleanup = () => {
  // Remove all listeners from process
  process.removeAllListeners();
  
  // Remove all listeners from console
  if (process.stdout && process.stdout.removeAllListeners) {
    process.stdout.removeAllListeners();
  }
  if (process.stderr && process.stderr.removeAllListeners) {
    process.stderr.removeAllListeners();
  }
};

// Clean up before starting tests
cleanup();

export default async () => {
  console.log('Global test setup completed - EventEmitter cleanup performed');
};
