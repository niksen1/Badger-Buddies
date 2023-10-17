//sources - got class name foor carousels using chatgpt to get correct formatting.
import React, { useState } from 'react';
const BadgerBudSummary = (props) => {

    const [showDetails, setShowDetails] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % props.imageId.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + props.imageId.length) % props.imageId.length);
    };


    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const getAge = () => {
        const age = props.age
        if (age < 12) {
            return `${age} month(s) old`;
        } else {
            const years = Math.floor(age / 12);
            const months = age % 12;
            return months === 0 ? `${years} year(s) old` : `${years} year(s) and ${months} month(s) old`;
        }
    };


    const imageStyle = {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
    };

    const containerStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
    };

    if (props.adoptedCat) {
        return <></>;
    }

    const ImageSources = props.imageId.map(
        (imageId) =>
            `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${imageId}`
    );
    return (
        <div key={props.id} className="buddy-summary" style={containerStyle}>
            {!showDetails ? (
                <img src={ImageSources[0]} style={imageStyle} alt={`${props.name} image 1`} className="img-fluid rounded aspect-ratio" />
            ) : (
                <div id={`carousel${props.id}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {ImageSources.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                                <img src={image} style={imageStyle} className="d-block w-100 img-fluid rounded aspect-ratio" alt={`${props.name} image ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" onClick={handlePrev} data-bs-target={`#carousel${props.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={handleNext} data-bs-target={`#carousel${props.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
            )}
            <h2>{props.name}</h2>
            {!props.basket ? (
                <>
                    <button onClick={toggleDetails}>{showDetails ? 'Show Less' : 'Show More'}</button>
                    <button onClick={props.onSave}>Save</button>
                </>
            ) : (
                <>
                    <button onClick={props.onUnsave}>Unselect</button>
                    <button onClick={props.onAdopt}>Adopt</button>
                </>
            )}
            {showDetails && (
                <div>
                    <p>Gender: {props.gender}</p>
                    <p>Breed: {props.breed}</p>
                    <p>Age: {getAge()}</p>
                    {props.description && <p>Description: {props.description}</p>}
                </div>
            )}
        </div>
    );
};

export default BadgerBudSummary;