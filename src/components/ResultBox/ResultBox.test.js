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

  it('should render proper info about conversion when USD -> PLN', () => {

    const testCases = [
      { amount: '2.85', from: 'USD', to: 'PLN' },
      { amount: '28.57', from: 'USD', to: 'PLN' },
      { amount: '57.14', from: 'USD', to: 'PLN' },
      { amount: '98.57', from: 'USD', to: 'PLN' },
    ];

    for(const testObj of testCases){

      const { amount, from, to } = testObj;
      
      render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      const output = screen.getByTestId('output');

      const result = Math.round(amount * 3.5 * 100) / 100;
      
      expect(output).toHaveTextContent(`$${amount} = ${to} ${result}`);

      cleanup();
    }
  });

  it('should render proper info about conversion when USD == PLN', () => {

    const testCases = [
      { amount: '10', from: 'PLN', to: 'PLN' },
      { amount: '10', from: 'USD', to: 'USD' },
      { amount: '200', from: 'PLN', to: 'PLN' },
      { amount: '200', from: 'USD', to: 'USD' },
    ];

    for(const testObj of testCases){

      const { amount, from, to } = testObj;
      
      render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      const output = screen.getByTestId('output');

      const currencySymbol = (symbol) => {
        if(symbol === 'USD'){
          return '$';
        } else {
          return symbol + ' ';
        }
      }

      const roundAmount = Number(amount).toFixed(2);
      
      expect(output).toHaveTextContent(`${currencySymbol(from)}${roundAmount} = ${currencySymbol(to)}${roundAmount}`);

      cleanup();
    }
  });

  it('should render proper info about conversion when amount is negative', () => {

    const testCases = [
      { amount: '-10', from: 'PLN', to: 'PLN' },
      { amount: '-10', from: 'USD', to: 'PLN' },
      { amount: '-200', from: 'PLN', to: 'PLN' },
      { amount: '-200', from: 'PLN', to: 'USD' },
    ];

    for(const testObj of testCases){

      const { amount, from, to } = testObj;
      
      render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      const output = screen.getByTestId('output');
      
      expect(output).toHaveTextContent('Wrong value...');

      cleanup();
    }
  });
});