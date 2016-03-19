import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reducerFetchPosts from './reducer_fetchPosts';

const rootReducer = combineReducers({
  posts: reducerFetchPosts,
  form: formReducer,
});

export default rootReducer;
