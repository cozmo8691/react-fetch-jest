import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import find from 'lodash/find';
import uuid from 'js-uuid';

import settings from '../config/settings';
import * as modes from '../config/modes';
import ItemList from './ItemList';
import Modal from './Modal';
import Form from './Form';
import {
  fetchItems,
  saveItem,
  filterItems,
  updateFetchItemsStatus,
  updateEditItemId
} from '../actions/actions';

const itemTemplate = {title: '', desc: '', image: '', itemId: ''};

export class MainContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(updateFetchItemsStatus(modes.PENDING));
    dispatch(fetchItems());
  }

  _cancelModal = () => {
    this.props.updateEditItemId(null);
  };

  render() {
    const {
      item,
      requestStatus,
      filterItems,
      updateEditItemId,
      statusMessage
    } = this.props;

    const {items, ...props} = this.props;

    return (
      <div>
        <header role='banner'>
          {requestStatus === modes.PENDING &&
            <div className='loading-msg'>Loading</div>
          }
          {requestStatus === modes.DONE_FAIL &&
            <div className='error-msg'>{settings.loadingErrorMsg}</div>
          }
          {statusMessage && <div className='status-msg'>{statusMessage}</div>}
          <label>Enter search term</label>
          <input type='text'
            className='search-input'
            placeholder='Enter search term'
            onChange={e => {filterItems(e.target.value);}}
          />
          <i className='material-icons'>search</i>
        </header>

        <ItemList items={items} updateEditItemId={updateEditItemId} />
        {item !== null &&
          <Modal
            onClose={this._cancelModal}>
            <Form
              {...props}
              cancelModal={this._cancelModal}
            />
          </Modal>
        }
        <div className='btn btn-add'
          onClick={updateEditItemId.bind(null, uuid())}>+</div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  items: PropTypes.array.isRequired,
  item: PropTypes.any,
  requestStatus: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  updateEditItemId: PropTypes.func.isRequired,
  filterItems: PropTypes.func.isRequired,
  statusMessage: PropTypes.string
};

MainContainer.defaultProps = {
  items: [],
  item: null,
  requestStatus: modes.IDLE
};


const mapStateToProps = function(store) {
  function getEditItem(id) {
    if (!id) {
      return null;
    }

    // set up default item template object
    const editItem = Object.assign({}, itemTemplate, {itemId: id});

    //if we can find it we're editing so return the item object
    return Object.assign({}, editItem,
      find(store.itemsState.items,
        item => item.itemId === id
      )
    );
  }

  return {
    items: store.itemsState.items,
    item: getEditItem(store.itemsState.editItemId),
    requestStatus: store.itemsState.requestStatus,
    statusMessage: store.itemsState.statusMessage
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    dispatch,
    saveItem: item => {
      dispatch(saveItem(item));
    },
    filterItems: searchTerm => {
      dispatch(filterItems(searchTerm));
    },
    updateEditItemId: itemId => {
      dispatch(updateEditItemId(itemId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
