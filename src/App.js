import './App.css';
import LoginPage from './components/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import { useStore } from './hooks/useStore';

function App() {
  return (
    <>
      
      {!useStore((state) => state.authData) ? (<><LoginPage /></>):(<>  <>
            <AdminDashboard/>
          </></>)}
    </>

  );
}

export default App;
