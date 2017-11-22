import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';


class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      updateEditItemId
    } = this.props;

    return (
      <ul className='item-list'
        role='main'>
        {items.map((item, i) =>
          !item.hidden &&
          <ListItem key={i}
            item={item}
            updateEditItemId={updateEditItemId}
          />
        )}
    </ul>);
  }
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  updateEditItemId: PropTypes.func.isRequired
};

ItemList.defaultProps = {
  items: []
};

export default ItemList;
