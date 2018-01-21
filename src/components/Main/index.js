import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '../List';
import Popup from '../Popup';
import Filter from '../Filter';
import * as actions from './actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.changeFormPopup = this.changeFormPopup.bind(this);
  }

  changeFormPopup(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.changeFormPopup({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        { this.props.openPopup
          && <Popup
            togglePopup={this.props.togglePopup}
            formItem={this.props.formItem}
            saveItem={this.props.saveItem}
            changeFormPopup={this.changeFormPopup}
          />
        }
        <div className="main">
          <h1>TODO List on React</h1>
          <button className="btn" onClick={this.props.togglePopup}>Добавить задачу</button>
          <Filter
            filters={this.props.filters}
            filterChange={this.props.filterChange}
          />
          { this.props.items.length !== 0
            && <List
              filters={this.props.filters}
              items={this.props.items}
              toggleSuccessItem={this.props.toggleSuccessItem}
              toggleViewItem={this.props.toggleViewItem}
              editItem={this.props.editItem}
              removeItem={this.props.removeItem}
            />
          }
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  openPopup: PropTypes.bool,
  formItem: PropTypes.object,
  togglePopup: PropTypes.func,
  changeFormPopup: PropTypes.func,
  saveItem: PropTypes.func,
  items: PropTypes.array,
  toggleSuccessItem: PropTypes.func,
  toggleViewItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  filterChange: PropTypes.func,
  filters: PropTypes.array,
};

function mapStateToProps(state) {
  const {
    openPopup, formItem, items, filters,
  } = state;
  return {
    openPopup,
    formItem,
    items,
    filters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePopup() {
      dispatch(actions.togglePopup());
    },

    changeFormPopup(formItem) {
      dispatch(actions.changeFormPopup(formItem));
    },

    saveItem(event) {
      event.preventDefault();
      dispatch(actions.saveItem());
    },

    toggleSuccessItem(id) {
      dispatch(actions.toggleSuccessItem(id));
    },

    toggleViewItem(id) {
      dispatch(actions.toggleViewItem(id));
    },

    editItem(id) {
      dispatch(actions.editItem(id));
      dispatch(actions.togglePopup());
    },

    removeItem(id) {
      dispatch(actions.removeItem(id));
    },

    filterChange(event) {
      const val = event.target.value;
      dispatch(actions.filterChange(val));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
