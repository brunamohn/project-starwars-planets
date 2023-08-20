import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import mockData from './mockData';
import { render } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/planets-provider';

describe('Teste do componente App', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => (mockData),
    });
  });
  test('Teste Header', async () => {
    render((
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ));

    const title = screen.getByRole('heading', {  name: /projeto star wars \- trybe/i})
    const imputSearch = screen.getByRole('textbox');
    const columnFilter = screen.getByTestId('column-filter');
    const operationFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})

    expect(title).toBeInTheDocument();
    expect(imputSearch).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(operationFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();

    userEvent.type(imputSearch, 'Hoth');

    expect(await screen.findAllByRole('row')).toHaveLength(1);

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(operationFilter, 'maior que');
    userEvent.type(valueFilter, '5000');
    userEvent.click(buttonFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(1);

  });  
});
