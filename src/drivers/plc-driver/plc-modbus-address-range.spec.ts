import plcModbusAddressRange from './plc-modbus-address-range';

describe('plcModbusAddressRange', () => {
  describe('construction with baseAddress and Length', () => {
    const range = new plcModbusAddressRange(100, 10);

    it('must have the specified baseAddress', () => {
      expect(range.baseAddress).toBe(100);
    });

    it('must have the specified length', () => {
      expect(range.length).toBe(10);
    });

    it('must have correct toAddress', () => {
      expect(range.toAddress).toBe(109);
    });
  });

  describe('construction with errored parameters', () => {
    it('negative baseAddress throws error', () => {
      expect(() => new plcModbusAddressRange(-10, 2)).toThrowError();
    });

    it('negative length throws error', () => {
      expect(() => new plcModbusAddressRange(10, -2)).toThrowError();
    });
  });

  describe('merging', () => {
    const range1 = new plcModbusAddressRange(100, 10);
    const range2 = new plcModbusAddressRange(105, 10);
    const range3 = new plcModbusAddressRange(110, 10);
    const range4 = new plcModbusAddressRange(150, 10);
    const range12 = plcModbusAddressRange.merge(range1, range2);
    const range23 = plcModbusAddressRange.merge(range2, range3);
    const range13 = plcModbusAddressRange.merge(range1, range3);
    const range14 = plcModbusAddressRange.merge(range1, range4);

    it('range1 + range2', () => {
      expect(range12.baseAddress).toBe(100);
      expect(range12.length).toBe(15);
      expect(range12.toAddress).toBe(114);
    });

    it('range1 + range3', () => {
      expect(range13.baseAddress).toBe(100);
      expect(range13.length).toBe(20);
      expect(range13.toAddress).toBe(119);
    });

    it('range2 + range3', () => {
      expect(range23.baseAddress).toBe(105);
      expect(range23.length).toBe(15);
      expect(range23.toAddress).toBe(119);
    });

    it('range1 + range4', () => {
      expect(range14.baseAddress).toBe(100);
      expect(range14.length).toBe(60);
      expect(range14.toAddress).toBe(159);
    });
  });
});
