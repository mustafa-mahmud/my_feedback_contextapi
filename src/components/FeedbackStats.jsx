import { useEffect } from 'react';
import { useFeedbackContextAPI } from '../context/ContextAPI.js';

const FeedbackStats = () => {
  const {
    calc_Reviews_Average,
    feedback,
    reviews,
    average,
  } = useFeedbackContextAPI();

  useEffect(() => {
    calc_Reviews_Average();
  }, [feedback]);
  //////////////////////////////////////////////
  return (
    <div className="feedback-stats">
      <h4>{reviews} reviews</h4>
      <h4>Average Rating: {average}</h4>
    </div>
  );
};

export default FeedbackStats;
