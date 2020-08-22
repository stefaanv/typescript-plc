import ImpulsRelais from './impuls-relais';

describe('impuls relais', () => {
  describe('construction', () => {
    test('initial state', () => {
      const impulsRelais = new ImpulsRelais(true);
      expect(impulsRelais.state).toBeTruthy();
    });
  });

  describe('state update', () => {
    test('sequence of modbus changes 1', () => {
      const impulsRelais = new ImpulsRelais(false);
      const f = jest.fn();
      impulsRelais.register(f);
      impulsRelais.input(false, false, 100);
      impulsRelais.input(false, false, 101);
      impulsRelais.input(true, true, 102);
      expect(f).toHaveBeenCalledTimes(3);
      expect(f).toHaveBeenCalledWith(true, true, 102);
    });

    test('sequence of modbus changes 2', () => {
      const impulsRelais = new ImpulsRelais(false);
      const f = jest.fn();
      impulsRelais.register(f);
      impulsRelais.input(false, false, 100);
      impulsRelais.input(false, false, 101);
      impulsRelais.input(true, true, 102);
      impulsRelais.input(true, false, 103);
      impulsRelais.input(true, false, 104);
      expect(f).toHaveBeenCalledTimes(5);
      expect(f).lastCalledWith(true, false, 104);
    });

    test('sequence of modbus changes 3', () => {
      const impulsRelais = new ImpulsRelais(false);
      const f = jest.fn();
      impulsRelais.register(f);
      impulsRelais.input(false, false, 100);
      impulsRelais.input(true, true, 101);
      impulsRelais.input(true, false, 102);
      impulsRelais.input(false, true, 103);
      impulsRelais.input(false, false, 104);
      expect(f).toHaveBeenCalledTimes(5);
      expect(f).lastCalledWith(true, false, 104);
    });

    test('sequence of modbus changes 4', () => {
      const impulsRelais = new ImpulsRelais(false);
      const f = jest.fn();
      impulsRelais.register(f);
      impulsRelais.input(false, false, 100);
      impulsRelais.input(true, true, 101);
      impulsRelais.input(true, false, 102);
      impulsRelais.input(false, true, 103);
      impulsRelais.input(false, false, 104);
      impulsRelais.input(true, true, 105);
      impulsRelais.input(true, false, 106);
      impulsRelais.input(false, true, 107);
      impulsRelais.input(false, false, 108);
      expect(f).toHaveBeenCalledTimes(9);
      expect(f).lastCalledWith(false, false, 108);
    });
  });
});
