import { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ApiDataPage from './pages/ApiDataPage';
import NotFound from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import ProfileLayout from './pages/ProfileLayout';
import { AppContext } from './AppContext'

function App() {
  const { theme, catData, addProfile, toggleTheme } = useContext(AppContext);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <NavBar theme={theme} toggleTheme={toggleTheme} mode={theme} />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />

            <Route
              path="/apidata"
              element={<ApiDataPage />}
            />
            <Route path="/profile" element={<ProfileLayout />}>
              <Route
                path=":id"
                element={<ProfilePage />}
              />
            </Route>
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;