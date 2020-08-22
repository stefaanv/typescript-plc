import { IModbusDataProcessor } from '../../function-block-base-classes/modbus-data-processor.interface';
import { FunctionBlock } from '../../function-block-base-classes/function-block';

export default class plcDigitalInput extends FunctionBlock<boolean>
  implements IModbusDataProcessor {
  // private _status: boolean;
  private readonly _mask: number;
  private readonly _modbusAddress: number;

  constructor(
    public name: string,
    private modbusAddress: number,
    bitPosition: number,
  ) {
    super();

    if (bitPosition > 7 || bitPosition < 0)
      throw new Error(
        'plcDigitalInput.constructor() - bitPosition must be between 0 and 7',
      );
    if (modbusAddress < 0)
      throw new Error(
        'plcDigitalInput.constructor() - modbusAddress must be larger than 0',
      );
    this._mask = 1 << bitPosition;
    this._modbusAddress = modbusAddress;
    this._state = false;
  }

  // public get status(): boolean {
  //   return this._status;
  // }

  public handleModbusData(buffer: Buffer, cycleNumber: number): void {
    const newStatus = (buffer[0] & this._mask) > 0;
    const statusChanged = newStatus != this._state;
    this._state = newStatus;
    this.notifyListeners(newStatus, statusChanged, cycleNumber);
  }
}
