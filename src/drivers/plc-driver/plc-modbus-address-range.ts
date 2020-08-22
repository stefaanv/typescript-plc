export default class plcModbusAddressRange {
  constructor(
    public readonly baseAddress: number,
    public readonly length: number,
  ) {
    if (this.baseAddress < 0) {
      throw new Error(
        'plcModbusAddressRange.constructor() - baseAddress must be a positive number',
      );
    }

    if (this.length < 0) {
      throw new Error(
        'plcModbusAddressRange.constructor() - length must be a positive number',
      );
    }
  }

  public get toAddress(): number {
    return this.baseAddress + this.length - 1;
  }

  public static merge(
    a: plcModbusAddressRange,
    b: plcModbusAddressRange,
  ): plcModbusAddressRange {
    const minBaseAddress =
      a.baseAddress <= b.baseAddress ? a.baseAddress : b.baseAddress;
    const maxToAddress = a.toAddress >= b.toAddress ? a.toAddress : b.toAddress;
    return new plcModbusAddressRange(
      minBaseAddress,
      maxToAddress - minBaseAddress + 1,
    );
  }
}
