import {
  CALC_REVIEWS_AVERAGE,
  REMOVE_REVIEWS,
  ADD_FEEDBACK,
  EDIT_FEEDBACK_ID,
  EDIT_FEEDBACK,
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

  /////////////////////////////////////////////////////
  throw new Error(`Action does not match with any ${action.type} type...`);
};

export default reducer;
