import { Logger } from "@nestjs/common";

export class AppLogger {
  private static logger = new Logger("AppLogger");

  static log(message: string, context = "AppLogger") {
    this.logger.log(message, context);
  }

  static error(message: string, trace?: string, context = "AppLogger") {
    this.logger.error(message, trace, context);
  }

  static warn(message: string, context = "AppLogger") {
    this.logger.warn(message, context);
  }

  static debug(message: string, context = "AppLogger") {
    this.logger.debug(message, context);
  }

  static verbose(message: string, context = "AppLogger") {
    this.logger.verbose(message, context);
  }
}
