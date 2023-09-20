import { useState, useEffect } from 'react';
import Ratings from './Ratings';
import Card from './shared/Card';
import { useFeedbackContextAPI } from '../context/ContextAPI.js';

const FormElements = () => {
  const [rating, setRating] = useState(10);
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const {
    addFeedback,
    reviews,
    editId,
    feedback,
    editFeedback,
  } = useFeedbackContextAPI();

  const handleChangeRating = (e) => {
    setRating(e.target.value);
  };

  const handleChangeText = (e) => {
    const newFB = e.target.value;

    verification(newFB);

    setText(newFB);
  };

  const verification = (newFB) => {
    console.log(editId);

    if (newFB.trim().length < 10) {
      setMsg('Text must be al lest 10 Characters...');
      setIsDisabled(true);
    } else {
      setMsg('');
      setIsDisabled(false);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (editId) {
      const newFB = {
        id: editId,
        text,
        rating: Number(rating),
      };

      editFeedback(editId, newFB);
    } else {
      const newFB = {
        id: reviews + 1,
        text,
        rating: Number(rating),
      };

      addFeedback(newFB);
    }

    setText('');
    setRating(10);
    setIsDisabled(true);
  };

  useEffect(() => {
    if (editId) {
      const item = feedback.find((fb) => fb.id === editId);

      verification(item.text);

      setText(item.text);
      setRating(item.rating);
    }
  }, [editId]);

  ///////////////////////////////////////////////////////////////////
  return (
    <Card>
      <form onSubmit={submitHandle}>
        <h2>How would you rate with us?</h2>
        <ul className="rating">
          {Array.from({ length: 10 }, (_, index) => {
            return (
              <Ratings
                key={index}
                index={index}
                selected={+rating}
                handleChange={handleChangeRating}
              />
            );
          })}
        </ul>
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review..."
            value={text}
            onChange={handleChangeText}
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
        <div className="message">{msg}</div>
      </form>
    </Card>
  );
};

export default FormElements;
