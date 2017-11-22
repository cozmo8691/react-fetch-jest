import uuid from 'js-uuid';

import * as Types from '../actions/actionTypes';
import * as modes from '../config/modes';

const initialState = {
  items: [],
  editItemId: null,
  requestStatus: modes.IDLE,
  statusMessage: ''
};

const ItemsReducer = function(state = initialState, action) {

  switch(action.type) {
    case Types.UPDATE_FETCH_ITEMS_STATUS:
      return Object.assign({}, state, {
        requestStatus: action.nextStatus
      });

    case Types.UPDATE_EDIT_ITEM_ID:
      return Object.assign({}, state, {
        editItemId: action.itemId
      });

    case Types.LOAD_ITEMS:
      return Object.assign({}, state, {
        items: items(action.items, action)
      });

    case Types.UPDATE_ITEM:
    case Types.ADD_ITEM:
    case Types.FILTER_ITEMS:
      return Object.assign({}, state, {
        items: items(state.items, action)
      });

    case Types.DISPLAY_MESSAGE:
      return Object.assign({}, state, {
        statusMessage: action.message
      });
  }

  return state;
};

function items(state = [], action) {
  switch (action.type) {
    case Types.LOAD_ITEMS:
      return state
        .map(item => (
          Object.assign({}, item, {
            itemId: uuid()
          })
        ));

    case Types.UPDATE_ITEM:
      return state
        .map(item => (
          item.itemId === action.item.itemId ?
            Object.assign({}, item, action.item)
            : item
        ));

    case Types.ADD_ITEM:
      return [...state, action.item];

    case Types.FILTER_ITEMS:
      return state
        .map(item => Object.assign({}, item, {
            hidden: item.title.toLowerCase()
              .indexOf(action.searchTerm.toLowerCase()) === -1
          }
        ));

    default:
      return state;
  }
}

export default ItemsReducer;
