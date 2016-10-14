# redux-action-enhancer-middleware
Middleware that provides an enhancing function to dispatched actions, with optional filtering to target only certain actions.

### Install

```js
npm i -S redux-action-enhancer-middleware
```

### Example

```js
import actionEnhancerMiddleware from 'redux-action-enhancer-middleware';

const options = {
  filter: (action) => true,
  enhancer: (dispatch, getState, action) => {...action}
};

const store = createStore(
  reducer,
  applyMiddleware(
    actionEnhancerMiddleware(options)
  )
);
```

### API

redux-action-enhancer-middleware takes an _options_ object with an optional __filter__ and a required __enhancer__.

#### Filter

```js
(action) => true
```

Function that receive an __action__ and returns a _boolean_ that determines if the __enhancer__ should be invoked.

#### Enhancer

```js
(dispatch, getState, action) => nextAction
```

Function that receives a __dispatch__, __getState__, and __action__. The enhancer returns an action.
