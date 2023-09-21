import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

import {
  CALC_REVIEWS_AVERAGE,
  REMOVE_REVIEWS,
  ADD_FEEDBACK,
  EDIT_FEEDBACK_ID,
  EDIT_FEEDBACK,
  FETCH_FEEDBACK_BEGIN,
  FETCH_FEEDBACK_SUCCESS,
  FETCH_FEEDBACK_ERROR,
} from './action';

const FeedbackContextAPI = createContext();

const initialState = {
  feedback: [],
  reviews: 0,
  average: 0,
  editId: null,
  isLoading: false,
  errMsg: '',
};

const FeedbackContextAPIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const calc_Reviews_Average = () => {
    dispatch({ type: CALC_REVIEWS_AVERAGE });
  };

  const removeFeedback = async (id) => {
    try {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: REMOVE_REVIEWS, payload: { id } });
    } catch (error) {
      console.log(error);
    }
  };

  const addFeedback = async (newFB) => {
    try {
      const res = await fetch('/feedback', {
        method: 'POST',
        body: JSON.stringify(newFB),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      dispatch({ type: ADD_FEEDBACK, payload: { newFB: data } });
    } catch (error) {
      console.log(error);
    }
  };

  const editFeedbackId = (id) => {
    dispatch({ type: EDIT_FEEDBACK_ID, payload: { id } });
  };

  const editFeedback = async (id, newFB) => {
    try {
      const res = await fetch(`/feedback/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newFB),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      dispatch({ type: EDIT_FEEDBACK, payload: { id, newFB: data } });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeedback = async () => {
    dispatch({ type: FETCH_FEEDBACK_BEGIN });

    try {
      const res = await fetch('/feedback');
      const data = await res.json();

      dispatch({ type: FETCH_FEEDBACK_SUCCESS, payload: { data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_FEEDBACK_ERROR, payload: { msg: error } });
    }
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
        fetchFeedback,
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
