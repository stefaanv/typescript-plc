import { Injectable } from '@nestjs/common';

@Injectable()
export class PlcDriverService {
  private _modbusAddressFrom: number;
  private _modbusAddressTo: number;

  constructor(private ipAddress: string, private pollingInterval: number) {}
}
