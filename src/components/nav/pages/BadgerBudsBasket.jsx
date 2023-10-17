import React, { useContext, useState, useEffect } from 'react';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import BadgerBudSummary from '../../BadgerBudSummary';
import { Container, Row, Col } from 'react-bootstrap';

export default function BadgerBudsBasket(props) {
    const buddyData = useContext(BadgerBudsDataContext);
    const [savedBuddies, setSavedBuddies] = useState([]);
    const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds')) || [];

    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const savedBuddiesData = buddyData.filter(buddy => savedCatIds.includes(buddy.id));
        setSavedBuddies(savedBuddiesData);
    }, [buddyData]);


    const handleUnsave = (buddyId) => {
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds')) || [];
        const updatedSavedCatIds = savedCatIds.filter((id) => id !== buddyId);
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds));
        setSavedBuddies(savedBuddies.filter((buddy) => buddy.id !== buddyId));
        const buddy = buddyData.find((buddy) => buddy.id === buddyId);
        alert(`${buddy.name} has been removed from your basket!`);
    };

    const handleAdopt = (buddyId) => {
        adoptedCatIds.push(buddyId);
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds));
        
        setSavedBuddies(savedBuddies.filter((buddy) => buddy.id !== buddyId));
        alert(`Thank you for adopting ${buddyData.find((buddy) => buddy.id === buddyId).name}!`);
    };



    const displayedBuddies = savedBuddies.filter((buddy) => !adoptedCatIds.includes(buddy.id));
    return (
        <Container>
            <h1>Badger Buds Basket</h1>
            {displayedBuddies.length == 0 ? (
                <>
                    <p>You have no buds in your basket!</p>
                </>
            ) : (
                <>
                    <p>These cute cats could be all yours!</p>
                </>
            )}
            <Row>
                {displayedBuddies.map((buddy) => (
                    <Col key={buddy.id} xs={12} sm={6} md={4} xl={3}>
                        <BadgerBudSummary
                            id={buddy.id}
                            name={buddy.name}
                            imageId={buddy.imgIds}
                            gender={buddy.gender}
                            age={buddy.age}
                            breed={buddy.breed}
                            description={buddy.description}
                            basket={true}
                            onUnsave={() => handleUnsave(buddy.id)}
                            onAdopt={() => handleAdopt(buddy.id)}
                            adoptedCat={adoptedCatIds.includes(buddy.id)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

