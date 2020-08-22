export type ModbusDataEventHandler = (
  buffer: Buffer,
  cycleNumber: number,
  timestamp: number,
) => void;

export interface ModbusDataEvent {
  register(handler: ModbusDataEventHandler): void;
}
