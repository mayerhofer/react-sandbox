export const add = activity => dispatch => {
  dispatch({ type: "ACTIVITY_INSERT_SUCCESS", payload: activity });
};
