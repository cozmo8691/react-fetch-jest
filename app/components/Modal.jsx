import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    window.addEventListener('keydown', this._handleModalKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleModalKeyDown);
  }

  _handleModalKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    const {
      children,
      onClose
    } = this.props;

    return (
      <div className='modal-wrapper'>
        <div className='modal-window'>
          <button
            className="btn-close"
            onKeyDown={this._handleKeyDown}
            onClick={onClose}>x</button>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  children: []
};

export default Modal;
