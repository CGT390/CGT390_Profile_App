import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Card from './components/Card';
import NavBar from './components/NavBar';
import CardWrapper from './components/CardWrapper';
import Form from './components/FOrm';

// Images
import scooterImage from './assets/scooter.jpeg';
import bibiImage from './assets/bibi.jpeg';
import murphyImage from './assets/murphyImage.jpeg';
import laikaImage from './assets/laikaImage.jpeg';
import dunkImage from './assets/dunkImage.jpeg';
import edgarImage from './assets/edgarImage.jpeg';
import gingerImage from './assets/gingerImage.jpeg';
import masonImage from './assets/mason.png';
import ezraImage from './assets/ezra.png';
import statlerImage from './assets/statler.png';

function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');

  const name = "Gillian Hanley";
  const email = "hanleyg@purdue.edu";

  const [cardData, setCardData] = useState([
    {
      id: 1,
      name: "Vito Scooterino",
      title: "Catnip Boss",
      email: "vito.scooterino@catnip.com",
      description: "Runs the territory with an iron paw and impeccable taste in catnip.",
      image: scooterImage
    },
    {
      id: 2,
      name: "Bibi 'The Whisper' Habibi",
      title: "Operations Specialist",
      email: "bibi.habibi@catnip.com",
      description: "Handles deals quietly and efficiently, never missing a pawstep.",
      image: bibiImage
    },
    {
      id: 3,
      name: "Murphy 'Claws' Malone",
      title: "Distribution Manager",
      email: "murphy.malone@catnip.com",  
      description: "Keeps the catnip moving smoothly through the neighborhood.",
      image: murphyImage
    },
    {
      id: 4,
      name: "Laika 'The Hound'",
      title: "Security",
      email: "laika.hound@catnip.com",
      description: "Watches the perimeter and ensures no intruders disturb the stash.",
      image: laikaImage
    },
    {
      id: 5,
      name: "Dunk 'Fast Paws'",
      title: "Enforcer",
      email: "dunk.fastpaws@catnip.com",
      description: "Strikes quickly to protect the catnip and settle disputes.",
      image: dunkImage
    },
    {
      id: 6,
      name: "Edgar 'Tripod'",
      title: "Street Scout",
      email: "edgar.tripod@catnip.com",
      description: "Three legs, sharp eyes—keeps tabs on the neighborhood with unmatched cunning.",
      image: edgarImage
    },
    {
      id: 7,
      name: "Ginger 'Red Claw'",
      title: "Negotiator",
      email: "ginger.redclaw@catnip.com",
      description: "Smooth-talking and clever, makes deals happen without raising suspicion.",
      image: gingerImage
    },
    {
      id: 8,
      name: "Mason 'Snowpaw'",
      title: "Lookout",
      email: "mason.snowpaw@catnip.com",
      description: "Small but vigilant, keeps an eye out for trouble with icy calm.",
      image: masonImage
    },
    {
      id: 9,
      name: "Ezra 'Shadow Whisker'",
      title: "Wild Card",
      email: "ezra.shadowwhisker@catnip.com",
      description: "No one knows what he’ll do next—clever, unpredictable, and always one step ahead.",
      image: ezraImage
    },
    {
      id: 10,
      name: "Statler 'Silk Scarf'",
      title: "Courier",
      email: "statler.silkscarf@catnip.com",
      description: "Moves through the streets with effortless flair—wind in his fur, always on time, always noticed.",
      image: statlerImage
    }
  ]);

  const titles = ['All', ...new Set(cardData.map(card => card.title))];

  const filteredCards = cardData.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTitle = selectedTitle === 'All' || card.title === selectedTitle;
    return matchesSearch && matchesTitle;
  });

  const updateProfiles = (newProfile) => {
    setCardData(prevData => [...prevData, newProfile]);
  }

  return (
    <Router basename="/CGT390_Profile_App/">
      <div className={`app ${theme}`}>
        {/* Persistent NavBar */}
        <NavBar theme={theme} toggleTheme={toggleTheme} mode={theme} />

        <main className="content">
          <Routes>
            {/* PAGE 1: Home/About */}
            <Route path="/" element={
              <>
                <h1 className="main-title">About Me</h1>
                <h2 className="main-name">{name}</h2>
                <div className="main-email">{email}</div>
                <div className="main-bio">
                  My name is Gillian Hanley, and I am currently a junior here at Purdue. I am studying Web Programming and Design,
                  and I am working towards a minor in Computer Science. I love creating websites, and
                  love learning as much as I can about them. I am originally from St. Louis, MO, but my family lives in Gainsville, GA. I have three
                  siblings, one older sister, and a younger brother and sister. We also have two teenage cats, Scooter and Habibi
                  (Habibi is a little plump, and Scooter is the enegetic one). I love playing frisbee at Purdue, crocheting, and getting a good sweet treat
                  whenever I can. </div>

                <CardWrapper
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  titles={titles}
                  selectedTitle={selectedTitle}
                  setSelectedTitle={setSelectedTitle}
                  mode={theme}
                >
                  {filteredCards.length === 0 ? (
                    <p className="no-results">No profiles found</p>
                  ) : (
                    filteredCards.map(card => (
                      <Card key={card.id} {...card} mode={theme} />
                    ))
                  )}
                </CardWrapper>
              </>
            } />

            {/* PAGE 2: Create Profile (The Form) */}
            <Route path="/contact" element={
              <div className="form-page">
                <h2>Create a New Profile</h2>
                <Form mode={theme} onUpdateProfiles={updateProfiles} />
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;