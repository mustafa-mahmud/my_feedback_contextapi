import { createContext, useContext, useReducer } from 'react';
import feedbackData from '../feedbackData';
import reducer from './reducer';

import {
  CALC_REVIEWS_AVERAGE,
  REMOVE_REVIEWS,
  ADD_FEEDBACK,
  EDIT_FEEDBACK_ID,
  EDIT_FEEDBACK,
} from './action';

const FeedbackContextAPI = createContext();

const initialState = {
  feedback: feedbackData,
  reviews: 0,
  average: 0,
  editId: null,
};
const FeedbackContextAPIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calc_Reviews_Average = () => {
    dispatch({ type: CALC_REVIEWS_AVERAGE });
  };

  const removeFeedback = (id) => {
    dispatch({ type: REMOVE_REVIEWS, payload: { id } });
  };

  const addFeedback = (newFB) => {
    dispatch({ type: ADD_FEEDBACK, payload: { newFB } });
  };

  const editFeedbackId = (id) => {
    dispatch({ type: EDIT_FEEDBACK_ID, payload: { id } });
  };

  const editFeedback = (id, newFB) => {
    dispatch({ type: EDIT_FEEDBACK, payload: { id, newFB } });
  };

  //////////////////////////////////////////////////////////////////
  return (
    <FeedbackContextAPI.Provider
      value={{
        ...state,
        calc_Reviews_Average,
        removeFeedback,
        addFeedback,
        editFeedbackId,
        editFeedback,
      }}
    >
      {children}
    </FeedbackContextAPI.Provider>
  );
};

export const useFeedbackContextAPI = () => {
  return useContext(FeedbackContextAPI);
};

export default FeedbackContextAPIProvider;
