# @milandadhaniya/tiny-logger-js

A tiny, extensible logger for both browser and Node.js environments, written in TypeScript.

## Installation

```bash
npm install @milandadhaniya/tiny-logger-js
```
## Usage

```javascript
import logger, { TinyLogger, LoggerConfig, LogParams } from '@milandadhaniya/tiny-logger-js';

// Using default logger instance
logger.log({ title: 'Init', msg: 'Application started' });
logger.info({ msg: 'Fetching data...' });
logger.warn({ title: 'Warning', msg: 'Deprecated method used' });
logger.error({ msg: 'An error occurred', force: true });
logger.debug({ title: 'Debug', msg: { userId: 123, status: 'active' } });
logger.trace('Trace message');
logger.table({ msg: [{ name: 'Alice' }, { name: 'Bob' }] });

logger.group('My Group');
logger.log({ msg: 'Inside group' });
logger.groupEnd();

logger.time('Load Time');
setTimeout(() => {
  logger.timeEnd('Load Time');
}, 500);

// Custom logger with restricted allowed log types
const config: LoggerConfig = { allowed: new Set(['log', 'error']) };
const customLogger = new TinyLogger(config);
customLogger.log({ msg: 'This will print' });
customLogger.info({ msg: 'This will NOT print' });
```
## API
| Method     | Description                       |
| ---------- | --------------------------------- |
| `log`      | General logs (console.log)        |
| `info`     | Informational logs (console.info) |
| `warn`     | Warnings (console.warn)           |
| `error`    | Errors (console.error)            |
| `debug`    | Debugging logs (console.debug)    |
| `trace`    | Trace stack trace (console.trace) |
| `table`    | Logs table format (console.table) |
| `group`    | Start log group (console.group)   |
| `groupEnd` | End log group (console.groupEnd)  |
| `time`     | Start timer (console.time)        |
| `timeEnd`  | End timer (console.timeEnd)       |

## Configuration
You can pass an optional `LoggerConfig` object to `TinyLogger` constructor to control allowed log types
```typescript
const logger = new TinyLogger({ allowed: new Set(['log', 'error']) });
```
## License
MIT © Milan Dadhaniya
