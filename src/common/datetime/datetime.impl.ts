import { addHours } from 'date-fns';

export class DateTime {
  static now(): Date {
    return new Date();
  }

  static expiresInHours(hours: number): Date {
    return addHours(DateTime.now(), hours);
  }
}
