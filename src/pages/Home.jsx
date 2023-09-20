import { FeedbackList, FormElements, FeedbackStats } from '../components';
import { useFeedbackContextAPI } from '../context/ContextAPI.js';

const Home = () => {
  const { feedback } = useFeedbackContextAPI();
  ////////////////////////////////////////////////
  return (
    <div className="container">
      <FormElements />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
};

export default Home;
