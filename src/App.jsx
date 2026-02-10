import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar';

// Pages
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ApiDataPage from './pages/ApiDataPage';
import NotFound from './pages/NotFound';

// Data
import { catData as initialCatData } from './data/homeData';

function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Shared state for cat profiles
  const [catData, setCatData] = useState(initialCatData);

  const addProfile = (newProfile) => {
    // Generate a new ID
    const newId = catData.length > 0 ? Math.max(...catData.map(cat => cat.id)) + 1 : 1;
    
    const profileWithId = {
      ...newProfile,
      id: newId
    };
    
    setCatData(prevData => [...prevData, profileWithId]);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <NavBar theme={theme} toggleTheme={toggleTheme} mode={theme} />

        <main className="content">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage theme={theme} catData={catData} />} 
            />
            <Route 
              path="/contact" 
              element={<ContactPage theme={theme} addProfile={addProfile} />} 
            />
            <Route 
              path="/apidata" 
              element={<ApiDataPage theme={theme} />} 
            />
            <Route
              path="*"
              element={<NotFound theme={theme} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;