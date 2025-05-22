export type LogType =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'debug'
  | 'table'
  | 'trace'
  | 'group'
  | 'groupEnd'
  | 'time'
  | 'timeEnd';

export type AllowedLogs = Set<LogType>;

export interface LoggerConfig {
  allowed?: AllowedLogs;
}

export interface LogParams {
  title?: string;
  msg: any;
  force?: boolean;
}

/**
 * TinyLogger: a minimal but extensible logger for Node.js and browser.
 */
export class TinyLogger {
  private readonly allowed: AllowedLogs;

  constructor(config?: LoggerConfig) {
    // If config.allowed is not provided, allow all logs by default
    this.allowed = config?.allowed ?? new Set<LogType>([
      'log',
      'info',
      'warn',
      'error',
      'debug',
      'table',
      'trace',
      'group',
      'groupEnd',
      'time',
      'timeEnd',
    ]);
  }

  private shouldLog(type: LogType, force = false): boolean {
    return force || this.allowed.has(type);
  }

  private format(title?: string, msg?: any): any[] {
    return title ? [title, msg] : [msg];
  }

  log({ title, msg, force }: LogParams): void {
    if (this.shouldLog('log', force)) console.log(...this.format(title, msg));
  }

  info({ title, msg, force }: LogParams): void {
    if (this.shouldLog('info', force)) console.info(...this.format(title, msg));
  }

  warn({ title, msg, force }: LogParams): void {
    if (this.shouldLog('warn', force)) console.warn(...this.format(title, msg));
  }

  error({ title, msg, force }: LogParams): void {
    if (this.shouldLog('error', force)) console.error(...this.format(title, msg));
  }

  debug({ title, msg, force }: LogParams): void {
    if (this.shouldLog('debug', force)) console.debug(...this.format(title, msg));
  }

  trace(msg: any): void {
    if (this.shouldLog('trace')) console.trace(msg);
  }

  table({ msg, force }: { msg: any; force?: boolean }): void {
    if (this.shouldLog('table', force)) console.table(msg);
  }

  group(label: string): void {
    if (this.shouldLog('group')) console.group(label);
  }

  groupEnd(): void {
    if (this.shouldLog('groupEnd')) console.groupEnd();
  }

  time(label: string): void {
    if (this.shouldLog('time')) console.time(label);
  }

  timeEnd(label: string): void {
    if (this.shouldLog('timeEnd')) console.timeEnd(label);
  }
}

/**
 * Default exported instance for convenience.
 */
const logger = new TinyLogger();

export default logger;
