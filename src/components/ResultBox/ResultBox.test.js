import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {

    const testCases = [
      { amount: '10.00', from: 'PLN', to: 'USD' },
      { amount: '100.00', from: 'PLN', to: 'USD' },
      { amount: '200.00', from: 'PLN', to: 'USD' },
      { amount: '345.00', from: 'PLN', to: 'USD' },
    ];

    for(const testObj of testCases){

      const { amount, from, to } = testObj;
  

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      const output = screen.getByTestId('output');

      const result = Math.round(amount / 3.5 * 100) / 100;

      expect(output).toHaveTextContent(`${from} ${amount} = $${result}`);

      cleanup();
    }
  });
});