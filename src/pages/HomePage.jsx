import React, { useState, useContext } from 'react';
import Card from '../components/Card';
import CardWrapper from '../components/CardWrapper';
import { userData } from '../data/homeData';
import './HomePage.css';
import { AppContext } from '../AppContext'


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');
  const { theme, catData } = useContext(AppContext);


  const titles = ['All', ...new Set(catData.map(card => card.title))];

  const filteredCards = catData.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTitle = selectedTitle === 'All' || card.title === selectedTitle;
    return matchesSearch && matchesTitle;
  });

  return (
    <>
      <h1 className="main-title">About Me</h1>
      <h2 className="main-name">{userData.name}</h2>
      <div className="main-email">{userData.email}</div>
      <div className="main-bio">
        {userData.bio}
      </div>

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
  );
};

export default HomePage;