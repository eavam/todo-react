import React, { Component } from 'react';
import moment from 'moment';
import List from './components/list/List';
import AddForm from './components/form/AddForm'
import Filter from './components/filter/Filter'

import './App.css';


const defaultState = [
  {
    label: 'Создать список задач',
    description: 'Создать приложение позволяющие создавать список дел, и возможность редактировать его',
    success: true,
    viewInformation: false,
    important: 'regular'
  },
  {
    label: 'Создать первую задачу',
    description: 'Создать первую задчау и посмотреть как ведет себя приложение',
    success: true,
    viewInformation: false,
    important: 'important'
  },
  {
    label: 'Удалить задачу',
    description: 'Удалить созданую задачу и узнать что будет',
    success: false,
    viewInformation: false,
    important: 'veryImportant'
  }
]

const defaultItem = {
  label: '',
  description: '',
  important: '',
  date: '',
  time: '',
  success: false,
  viewInformation: false,
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      popUpAddItem: false,
      filter: [],
      filterAll: true,
      newItem: {...defaultItem},
      stateList: JSON.parse(localStorage.getItem('todoDate')) || defaultState
    }

    this.setValue = (e, type) => {
      const { newItem } = this.state;
      const val = e.target.value;

      switch (type) {

        case 'label':
          newItem.label = val;
          break;

        case 'description':
          newItem.description = val;
          break;

        case 'important':
          newItem.important = val;
          break;

        case 'date':
          newItem.date = val;
          this.setTimestamp();
          break;

        case 'time':
          newItem.time = val;
          this.setTimestamp();
          break;
      
        default:
          break;
      }

      this.setState({newItem})
    }

    this.setTimestamp = () => {
      const { newItem } = this.state
      const date = `${newItem.date} ${newItem.time}`
      newItem.timestamp = new Date(date);
      this.setState({newItem})
    }

    this.viewInformation = (e, id) => {
      const { stateList } = this.state;
      stateList[id].viewInformation = !stateList[id].viewInformation;
      this.setState({stateList})
    }

    this.addListItem = e => {
      e.preventDefault();

      const { stateList } = this.state
      stateList.push({...this.state.newItem})

      this.setState({
        stateList: stateList,
        newItem: {...defaultItem},
      })

      this.togglePopupForm();

    }

    this.closeForm = () => {
      this.togglePopupForm();
    }

    this.saveItem = e => {
      e.preventDefault();
      this.setState({ newItem: {...defaultItem} })
      this.togglePopupForm();
    }

    this.removeItem = (e, id) => {
      const state = this.state.stateList;
      state.splice( id, 1 )
      this.setState({ stateList: state })
    }

    this.checkSuccess = (e, id) => {
      const { stateList } = this.state;

      stateList[id].success = !stateList[id].success;

      if( stateList[id].success ) stateList[id].timeEnd = moment().format('YYYY-MM-DD HH:mm')
      else stateList[id].timeEnd = ''

      this.setState({ stateList })
    }

    this.togglePopupForm = type => {
      this.setState({
        typeForm: type,
        popUpAddItem: !this.state.popUpAddItem
      });
    }

    this.addItem = () => {
      this.setState({ newItem: {...defaultItem} });
      this.togglePopupForm('add')
    }

    this.editItem = (e, id) => {
      const { stateList } = this.state;
      this.setState({ newItem: stateList[id] });
      this.togglePopupForm('edit')
    }

    this.saveToLocal = () => {
      localStorage.setItem('todoDate', JSON.stringify(this.state.stateList))
    }

    this.setFilter = e => {
      const { filter } = this.state;
      const indexElement = filter.indexOf(e.target.value)

      if( indexElement !== -1 ) filter.splice(indexElement, 1)
      else filter.push(e.target.value)

      this.setState(filter);

      if( !filter.length ) this.setFilterAll();
      else this.setState({filterAll: false});
    }

    this.setFilterAll = () => {
      let { filterAll, filter } = this.state;
      
      if( filterAll && !filter.length ) return;

      if( !filterAll ) {
        this.setState({ filterAll: true, filter: [] });
      } else {
        this.setState({ filterAll: false });
      }
    }

  }

  componentDidUpdate() {
    this.saveToLocal();
  }

  render() {
    return (
      <div>
        { 
            this.state.popUpAddItem
          ?
            <AddForm 
              addListItem={this.addListItem}
              closeForm={this.closeForm}
              saveItem={this.saveItem}
              setValue={this.setValue}
              newItem={this.state.newItem}
              type={this.state.typeForm}
            />
          :
            null
        }
        <div className="main">
          <h1>TODO List</h1>
          <button className="btn" onClick={this.addItem}>Добавить задачу</button>
          <Filter
            setFilter={this.setFilter}
            filters={this.state.filter}
            setFilterAll={this.setFilterAll}
            filterAll={this.state.filterAll}
          />
          { this.state.stateList.length
            ?
              <List 
                filter={this.state.filter}
                listItems={this.state.stateList}
                removeItem={this.removeItem}
                checkSuccess={this.checkSuccess}
                viewInformation={this.viewInformation}
                editItem={this.editItem}
              />
            :
              null
          }
        </div>
      </div>
    );
  }
}

export default App;
