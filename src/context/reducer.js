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

const reducer = (state, action) => {
  if (action.type === CALC_REVIEWS_AVERAGE) {
    const reviews = state.feedback.length;
    let average = state.feedback.reduce((total, curr) => {
      return (total = total + curr.rating);
    }, 0);
    average = (average / reviews).toFixed(1);
    average = average.split('.')[1] === '0' ? average.split('.')[0] : average;

    return {
      ...state,
      reviews,
      average,
    };
  }

  if (action.type === REMOVE_REVIEWS) {
    const newFeedback = state.feedback.filter(
      (item) => item.id !== action.payload.id
    );

    return {
      ...state,
      feedback: newFeedback,
    };
  }

  if (action.type === ADD_FEEDBACK) {
    return {
      ...state,
      feedback: [action.payload.newFB, ...state.feedback],
    };
  }

  if (action.type === EDIT_FEEDBACK_ID) {
    return {
      ...state,
      editId: action.payload.id,
    };
  }

  if (action.type === EDIT_FEEDBACK) {
    const newFeedback = state.feedback.map((item) => {
      if (item.id === action.payload.id) return action.payload.newFB;

      return item;
    });

    return {
      ...state,
      feedback: newFeedback,
      editId: null,
    };
  }

  if (action.type === FETCH_FEEDBACK_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === FETCH_FEEDBACK_SUCCESS) {
    return {
      ...state,
      feedback: action.payload.data,
      isLoading: false,
    };
  }

  if (action.type === FETCH_FEEDBACK_ERROR) {
    return {
      ...state,
      errMsg: action.payload.msg,
      isLoading: false,
    };
  }

  /////////////////////////////////////////////////////
  throw new Error(`Action does not match with any ${action.type} type...`);
};

export default reducer;
