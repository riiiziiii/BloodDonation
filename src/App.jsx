import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import Header from './components/common/Header';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <AppRouter />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;