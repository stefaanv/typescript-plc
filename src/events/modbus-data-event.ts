export type ModbusDataEventHandler = (
  buffer: Buffer,
  cycleNumber: number,
) => void;

export interface ModbusDataEvent {
  register(handler: ModbusDataEventHandler): void;
}
