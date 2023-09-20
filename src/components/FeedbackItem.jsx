import { FaTimes, FaEdit } from 'react-icons/fa';
import Card from './shared/Card';
import { useFeedbackContextAPI } from '../context/ContextAPI.js';

const FeedbackItem = ({ id, text, rating }) => {
  const { removeFeedback, editFeedbackId } = useFeedbackContextAPI();
  ////////////////////////////////////////////////////////////
  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button
        type="button"
        className="close"
        onClick={() => removeFeedback(id)}
      >
        <FaTimes />
      </button>
      <button type="button" className="edit" onClick={() => editFeedbackId(id)}>
        <FaEdit />
      </button>
      <div className="text-display">{text}</div>
    </Card>
  );
};

export default FeedbackItem;
