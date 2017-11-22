import find from 'lodash/find';

import * as Types from '../actions/actionTypes';
import * as modes from '../config/modes';
import itemsAPI from '../API/itemsAPI';
import store from '../store';

export function fetchItems() {
  return dispatch => {
    itemsAPI.loadData()
      .then((response) => {
        dispatch(fetchItemsSuccess(response));
      })
      .catch((res) => {
        dispatch(updateFetchItemsStatus(modes.DONE_FAIL));
        throw new Error(res);
      });
  };
}

export function updateFetchItemsStatus(nextStatus) {
  return {
    type: Types.UPDATE_FETCH_ITEMS_STATUS,
    nextStatus
  };
}


export function fetchItemsSuccess(items) {
  return dispatch => {
    dispatch(loadItems(items));
    dispatch(updateFetchItemsStatus(modes.DONE_SUCCESS));
  };
}

export function loadItems(items) {
  return {
    type: Types.LOAD_ITEMS,
    items
  };
}

export function saveItem(saveItem) {
  return dispatch => {
    const items = store.getState().itemsState.items;

    if (find(items, item => item.itemId === saveItem.itemId)) {
      dispatch(updateItem(saveItem));
      dispatch(displayMessage('Item successfully updated'));
    }
    else {
      dispatch(addItem(saveItem));
      dispatch(displayMessage('Item added successfully'));
    }

    setTimeout(() => {
      dispatch(displayMessage(''));
    }, 3000);
  };
}

export function displayMessage(message) {
  return {
    type: Types.DISPLAY_MESSAGE,
    message
  };
}

export function updateItem(item) {
  return {
    type: Types.UPDATE_ITEM,
    item
  };
}

export function addItem(item) {
  return {
    type: Types.ADD_ITEM,
    item
  };
}

export function filterItems(searchTerm) {
  return {
    type: Types.FILTER_ITEMS,
    searchTerm
  };
}

export function updateEditItemId(itemId) {
  return {
    type: Types.UPDATE_EDIT_ITEM_ID,
    itemId
  };
}
