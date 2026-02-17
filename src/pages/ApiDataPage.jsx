import React, { useState, useEffect, useContext  } from 'react';
import Card from '../components/Card';
import CardWrapper from '../components/CardWrapper';
import './ApiDataPage.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext'

const ApiDataPage = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [fetchedTitles, setFetchedTitles] = useState([]);
    const [searchFetchedTerm, setSearchFetchedTerm] = useState('');
    const [selectedFetchedTitle, setSelectedFetchedTitle] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useContext(AppContext);



    const filteredFetchedCards = fetchedData.filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchFetchedTerm.toLowerCase());
        const matchesTitle = selectedFetchedTitle === 'All' || card.title === selectedFetchedTitle;
        return matchesSearch && matchesTitle;
    });

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://web.ics.purdue.edu/%7Ezong6/profile-app/fetch-data.php", {
                    signal: controller.signal
                });
                const data = await response.json();

                // If API returns object with array inside
                console.log("Fetched profile data:", data);
                const transformedData = data.map(card => ({
                    id: card.id,
                    name: card.name,
                    title: card.title,
                    email: card.email,
                    description: card.bio, // Map 'bio' to 'description'
                    image: card.image_url  // Map 'image_url' to 'image'
                }));
                setFetchedData(transformedData);

            } catch (error) {
                if (error.name !== "AbortError") console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        return () => controller.abort();
    }, []);


    useEffect(() => {
        const controller = new AbortController();
        const fetchTitles = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://web.ics.purdue.edu/%7Ezong6/profile-app/get-titles.php", {
                    signal: controller.signal
                });
                const data = await response.json();
                console.log("Fetched titles data:", data);
                setFetchedTitles(data.titles);
            } catch (error) {
                if (error.name !== "AbortError") console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTitles();
        return () => controller.abort();
    }, []);

    return (
        <div className="api-data-page">
            <h1>View Fetched Data</h1>
            <CardWrapper
                searchTerm={searchFetchedTerm}
                setSearchTerm={setSearchFetchedTerm}
                titles={fetchedTitles}
                selectedTitle={selectedFetchedTitle}
                setSelectedTitle={setSelectedFetchedTitle}
                mode={theme}
            >
                {isLoading ? (
                    <p className="loading">Loading profiles...</p>
                ) : filteredFetchedCards.length === 0 ? (
                    <p className="no-results">No profiles found</p>
                ) : (
                    filteredFetchedCards.map(card => (
                        <Link key={card.id} to={`/profile/${card.id}`} className="profile-link">
                            <Card key={card.id} {...card} mode={theme} />
                        </Link>
                    ))
                )}
            </CardWrapper>
        </div>
    );
};

export default ApiDataPage;