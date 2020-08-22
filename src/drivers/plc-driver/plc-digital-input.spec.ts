import plcDigitalInput from './plc-digital-input';

describe('plc digital input', () => {
  describe('construction', () => {
    test('bitPosition <0 throws error', () => {
      expect(() => new plcDigitalInput('test', 10, -1)).toThrowError;
    });

    test('bitPosition >7 throws error', () => {
      expect(() => new plcDigitalInput('test', 10, 8)).toThrowError;
    });

    test('Status is false after correct construction', () => {
      const digInput = new plcDigitalInput('test', 10, 5);
      expect(digInput.state).toBeFalsy();
      expect(digInput.name).toBe('test');
    });
  });

  describe('modbus update', () => {
    test('unchanged output', () => {
      const digInput = new plcDigitalInput('test', 10, 5);
      const f = jest.fn();
      digInput.register(f);
      const buf = Buffer.from([0x0f]);
      digInput.handleModbusData(buf, 31, 0);
      expect(f).toHaveBeenCalledWith(false, false, 31, 0);
    });

    test('different output', () => {
      const digInput = new plcDigitalInput('test', 10, 5);
      const f = jest.fn();
      digInput.register(f);
      const buf = Buffer.from([0x20]);
      digInput.handleModbusData(buf, 65, 0);
      expect(f).toHaveBeenCalledWith(true, true, 65, 0);
    });

    test('sequence of modbus changes', () => {
      const digInput = new plcDigitalInput('test', 10, 5);
      const f = jest.fn();
      digInput.register(f);
      const buf = Buffer.from([0x20]);
      digInput.handleModbusData(buf, 5, 0);
      digInput.handleModbusData(buf, 6, 0);
      buf[0] = 0x00;
      digInput.handleModbusData(buf, 7, 0);
      expect(f).toHaveBeenCalledTimes(3);
    });
  });
});
