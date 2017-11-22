import React from 'react';
import PropTypes from 'prop-types';


const ListItem = ({item, updateEditItemId}) => (
  <li className='list-item'>
    <img src={item.image} alt={item.title} />
    <h2>{item.title}</h2>
    <p>{item.desc}</p>
    <div onClick={updateEditItemId.bind(null, item.itemId)}
      className='btn btn-edit'>Edit</div>
  </li>
);

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  updateEditItemId: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  item: {}
};

export default ListItem;
