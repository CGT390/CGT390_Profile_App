import React, { useState, useContext, useCallback, useMemo } from 'react';
import Card from '../components/Card';
import CardWrapper from '../components/CardWrapper';
import { userData } from '../data/homeData';
import './HomePage.css';
import { AppContext } from '../AppContext'
import { useFilteredCards } from '../hooks/useFilteredCards';

const HomePage = () => {

  const { theme, catData } = useContext(AppContext);

  const {
    searchTerm,
    setSearchTerm,
    selectedTitle,
    setSelectedTitle,
    titles,
    filteredCards
  } = useFilteredCards(catData);

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