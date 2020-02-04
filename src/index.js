import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import App from "./App";

function logger({ getState }) {
  return next => action => {
    return next(action);
  };
}

function activities(state = [], action) {
  switch (action.type) {
    case "ACTIVITY_INSERT_SUCCESS":
      state.push(action.payload);
      return state;
    case "ACTIVITY_UPDATE_SUCCESS":
      let found = state.find(a => a.elementId === action.payload.elementId);
      let index = state.indexOf(found);
      state[index] = action.payload;
      return state;
    default:
      return state;
  }
}

let rootReducer = combineReducers({ activities });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  activities: [
    {
      elementId: 1,
      name: "Multikafeteria",
      description: "Zerar saldo do ano"
    },
    {
      elementId: 2,
      name: "act 2",
      description: "Nao sei"
    },
    {
      elementId: 3,
      name: "act 3",
      description: "Alguns detalhes"
    }
  ]
};

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
