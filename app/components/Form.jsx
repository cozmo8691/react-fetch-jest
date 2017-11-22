import React from 'react';
import PropTypes from 'prop-types';
import settings from '../config/settings';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      errors: {}
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDown);
  }

  componentDidMount() {
    this._validateInputs();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this._saveItem(this.state.item);
    }
  };

  _validateInputs = () => {
    const {item} = this.state;
    const errors = Object.keys(item)
      .reduce((acc, curr) => {
        return Object.assign({}, acc, {[curr]: !item[curr]});
      }, {});

    this.setState({errors});
  };

  _updateValue = (key, nextValue) => {
    this.setState({item:
      Object.assign({}, this.state.item, {
        [key]: nextValue
      })
    });
  };

  _saveItem = (e, item) => {
    e.preventDefault();
    const {saveItem, cancelModal} = this.props;
    saveItem(item);
    cancelModal();
  };

  render() {
    const {item} = this.state;
    const {title} = this.props.item;
    const heading = title ? `Editing ${title}`
      : `Adding a New ${settings.entity}`;
    const {errors} = this.state;
    const isError = Object.keys(errors)
      .filter(key => !!errors[key])
      .length > 0;

    return (
      <form>
        <legend>{heading}</legend>
        {Object.keys(item)
          .filter(key => key !== 'hidden')
          .map((key, i) =>
            <div className={`form-row ${key}`} key={key}>
              <label>{key}</label>
              <input value={item[key]}
                type='text'
                onChange={e => {
                 this._updateValue(key, e.target.value);
                 this._validateInputs();
                }}
                onBlur={this._validateInputs}
                autoFocus={i === 0}
              />
              {errors[key] && <span className='input-error'>Field is required</span>}
            </div>
        )}
        {isError ?
          <button
            className='btn btn-save btn-save-disabled'
            onClick={e => {e.preventDefault();}}>Save</button>
              : <button className='btn btn-save'
                onClick={e => {this._saveItem(e, item);}}>Save</button>
        }
      </form>
    );
  }
}

Form.propTypes = {
  saveItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  cancelModal: PropTypes.func.isRequired
};

Form.defaultProps = {
  item: {}
};

export default Form;
