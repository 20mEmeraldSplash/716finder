import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import DataSetupPage from './pages/DataSetupPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className='h-screen flex flex-col overflow-hidden'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/report' element={<AdminPage />} />
          <Route path='/setup' element={<DataSetupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
