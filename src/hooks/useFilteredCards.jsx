// hooks/useFilteredCards.js
import { useState, useMemo, useCallback } from 'react';

export const useFilteredCards = (cards) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('All');

  const titles = useMemo(() => ['All', ...new Set(cards.map(card => card.title))], [cards]);

  const filterCards = useCallback(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTitle = selectedTitle === 'All' || card.title === selectedTitle;
      return matchesSearch && matchesTitle;
    });
  }, [cards, searchTerm, selectedTitle]);

  const filteredCards = useMemo(() => filterCards(), [filterCards]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTitle,
    setSelectedTitle,
    titles,
    filteredCards
  };
};