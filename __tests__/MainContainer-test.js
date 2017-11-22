import React from 'react';
import {Provider, connect} from 'react-redux';
import store from '../app/store';
import find from 'lodash/find';
import { shallow, mount, render } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


import {MainContainer} from '../app/components/MainContainer';

import {
  fetchItems,
  saveItem,
  filterItems,
  updateFetchItemsStatus,
  updateEditItemId
} from '../app/actions/actions';

const itemTemplate = {title: '', desc: '', image: '', itemId: ''};

const itemData = [
  {
    "title":"Lemon cheesecake",
    "desc":"A cheesecake made of lemon.",
    "image":"cake.jpg",
    "itemId": "123"
  },
  {
    "title":"Chocolate cake",
    "desc":"There goes my diet.",
    "image":"cake.jpg",
    "itemId": "456"
  },
  {
    "title":"Carrot cake",
    "desc":"A healthier option.",
    "image":"cake.jpg",
    "itemId": "789"
  }
];


describe('MainContainer', function() {
  let wrapper;
  let TestMainContainer;
  let mockResponse;


  beforeAll(function() {
    const mapStateToProps = function(store) {
      function getEditItem(id) {
        if (!id) {
          return null;
        }
        const editItem = Object.assign({}, itemTemplate, {itemId: id});

        return Object.assign({}, editItem,
          find(store.itemsState.items,
            item => item.itemId === id
          )
        )
      }

      return {
        items: store.itemsState.items,
        item: getEditItem(store.itemsState.editItemId),
        requestStatus: store.itemsState.requestStatus
      };
    };

    const mapDispatchToProps = function(dispatch) {
      return {
        dispatch,
        saveItem: item => {
          dispatch(saveItem(item))
        },
        filterItems: searchTerm => {
          dispatch(filterItems(searchTerm))
        },
        updateEditItemId: itemId => {
          dispatch(updateEditItemId(itemId))
        }
      }
    };

    TestMainContainer = connect(
      mapStateToProps,
      mapDispatchToProps
    )(MainContainer);
  });

  beforeEach(function() {

     mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
          'Content-type': 'application/json'
        }
      });
    };

     window.fetch = jest.fn().mockImplementation(() =>
       Promise.resolve(mockResponse(200, null, JSON.stringify(itemData)))
       //Promise.reject(mockResponse(500, null, null))
     );

     wrapper = mount(
       <Provider store={store}>
         <TestMainContainer />
       </Provider>);
  });

  it('Bootstraps with remote data', async function() {
    await wrapper.update();
    expect(wrapper.find('li').length).toBe(itemData.length);
  });

});