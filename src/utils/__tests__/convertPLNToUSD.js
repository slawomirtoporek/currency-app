import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-543')).toBeNaN();
  });

  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return Error if input is not a text or number', () => {
    expect(convertPLNToUSD(function() {})).toBe('error');
    expect(convertPLNToUSD([])).toBe('error');
    expect(convertPLNToUSD({})).toBe('error');
  });

  it('should return $0.00 if input is lower than 0', () => {
    expect(convertPLNToUSD(-1000)).toBe('$0.00');
    expect(convertPLNToUSD(-25.99)).toBe('$0.00');
    expect(convertPLNToUSD(-0.001)).toBe('$0.00');
  });
});