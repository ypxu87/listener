import {createReducer} from 'redux-action-tools'
import _ from 'lodash'

let initialState = {
  logged: false,
  logging: false
};

const reducer = createReducer().when('LOGIN', (state, {payload}) => {
  let newState = _.cloneDeep(state);
  newState.logged = false;
  newState.logging = true;
  return newState;
}).done((state, action) => {
  let newState = Object.assign({}, state, {
    logged: true,
    logging: false
  })
  return newState;
}).when('LOGOUT', (state) => {
   let newState = _.assign({},state, {
     logged:false,
     logging:false
   });
  return newState;
}).build(initialState);

export default reducer;
