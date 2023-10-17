import React, { useContext, useEffect, useState } from 'react';
import BadgerBudSummary from '../../BadgerBudSummary';
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext';
import { Container, Row, Col } from 'react-bootstrap';


export default function BadgerBudsAdoptable(props) {
    const buddyData = useContext(BadgerBudsDataContext);


    const [savedCatIds, setSavedCatIds] = useState(() => {
        const savedIds = sessionStorage.getItem('savedCatIds');
        return savedIds ? JSON.parse(savedIds) : [];
    });

    const handleSaveClick = (id) => {
        setSavedCatIds([...savedCatIds, id]);
        sessionStorage.setItem('savedCatIds', JSON.stringify([...savedCatIds, id]));
        alert(`${buddyData.find((buddy) => buddy.id === id).name} has been added to your basket!`);
    };

    const isBuddySaved = (id) => savedCatIds.includes(id);

    return (
        <Container>
            <h1>Available Badger Buds</h1>
            {savedCatIds.length == 20 ? (
                <>
                    <p>No buds are available for adoption!</p>
                </>
            ) : (
                <>
                    <p>The following cats are looking for a loving home! Could you help?</p>
                </>
            )}
            <Row>
                {buddyData.map((buddy) => (
                    !isBuddySaved(buddy.id) && (
                        <Col key={buddy.id} xs={12} sm={6} md={4} xl={3}>
                            <BadgerBudSummary
                                id={buddy.id}
                                name={buddy.name}
                                imageId={buddy.imgIds}
                                gender={buddy.gender}
                                age={buddy.age}
                                breed={buddy.breed}
                                description={buddy.description}
                                basket={false}
                                onSave={() => handleSaveClick(buddy.id)}
                            />
                        </Col>
                    )
                ))}
            </Row>
        </Container>
    );
}