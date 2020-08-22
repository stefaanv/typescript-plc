import { ModbusDataEventHandler } from '@src/events/modbus-data-event';

export interface IModbusDataProcessor {
  handleModbusData: ModbusDataEventHandler;
}
