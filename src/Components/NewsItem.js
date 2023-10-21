import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export default function NewsItem(props) {
    let { title, description, imageUrl, myurl, author, date,text} = props;

    const [showModal, setShowModal] = useState(false);
    const [sentimentResult, setSentimentResult] = useState('');

    const handleSentiment = async () => {
        const url = 'https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_NEWS_SENTIMENT_API,
                'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com',
            },
            body: JSON.stringify({
                language: 'english',
                text: text,
            }),
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const sentiment = result.sentiment;

            setSentimentResult(sentiment);
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    }

    
    return (
        <div>
            <div className="card my-3">
                <img src={imageUrl} className="card-img-top" style={{ height: "17rem" }} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}....</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={myurl} className="btn btn-dark" target="blank">Read More</a>
                    <button className="btn btn-dark my-2 mx-2" onClick={handleSentiment}>Sentiment</button>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sentiment Analysis Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{sentimentResult}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}
