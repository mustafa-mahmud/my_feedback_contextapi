import { useEffect } from 'react';
import { useFeedbackContextAPI } from '../context/ContextAPI.js';
import spinner from '../assets/spinner.gif';

const FeedbackStats = () => {
  const {
    calc_Reviews_Average,
    feedback,
    reviews,
    average,
    isLoading,
  } = useFeedbackContextAPI();

  useEffect(() => {
    calc_Reviews_Average();
  }, [feedback]);

  //////////////////////////////////////////////
  if (isLoading) {
    return <img src={spinner} alt="loading" />;
  }

  return (
    <div className="feedback-stats">
      <h4>{reviews} reviews</h4>
      <h4>Average Rating: {average}</h4>
    </div>
  );
};

export default FeedbackStats;
