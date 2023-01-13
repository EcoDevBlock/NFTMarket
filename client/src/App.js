import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouteComponent from './routes/RouteComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
