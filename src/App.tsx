import './App.css';
import PlanetsProvider from './context/planets-provider';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}
//
export default App;
