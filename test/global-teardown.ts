// Global teardown file that runs after all tests
// This ensures complete cleanup of EventEmitter listeners

export default async () => {
  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
  
  // Remove all listeners from process
  process.removeAllListeners();
  
  // Remove all listeners from console streams
  if (process.stdout && process.stdout.removeAllListeners) {
    process.stdout.removeAllListeners();
  }
  if (process.stderr && process.stderr.removeAllListeners) {
    process.stderr.removeAllListeners();
  }
  
  // Clear all timers
  if (typeof jest !== 'undefined') {
    jest.clearAllTimers();
  }
  
  console.log('Global test teardown completed - All EventEmitter listeners cleaned up');
};
