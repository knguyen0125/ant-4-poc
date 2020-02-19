const errorReducer = (state = {}, action) => {
  const isRequestType = action.type.includes("REQUEST_");
  if (!isRequestType) return state;

  const requestName = action.type.replace("_FINISHED", "");

  return {
    ...state,
    [requestName]: action.error === true ? action.payload : undefined
  };
};

export default errorReducer;
