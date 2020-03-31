import { v4 as uuid } from 'uuid';
import IError from './IError';

export default class HttpErrorResponseModel implements IError {
  public readonly id: string = uuid();

  public status: number = 0;

  public message: string = '';

  public errors: string[] = [];

  public url: string = '';

  public raw: any = null;
}
