import FeedbackItem from './FeedbackItem';
import { useFeedbackContextAPI } from '../context/ContextAPI.js';

const FeedbackList = () => {
  const { feedback } = useFeedbackContextAPI();

  /////////////////////////////////////////////////////////////////////
  return (
    <div className="feedback-list">
      <div style={{ opacity: 1 }}>
        {feedback.map((item) => {
          return <FeedbackItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default FeedbackList;
