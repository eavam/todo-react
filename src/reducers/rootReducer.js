import * as actionTypes from '../actionTypes'

const defaultItems = [
  {
    id: 0,
    label: 'Создать список задач',
    description: 'Создать приложение позволяющие создавать список дел, и возможность редактировать его',
    success: true,
    viewInformation: false,
    important: 'regular',
    date: '2017-04-03',
    time: '',
    dateEnd: ''
  },
  {
    id: 1,
    label: 'Создать первую задачу',
    description: 'Создать первую задчау и посмотреть как ведет себя приложение',
    success: true,
    viewInformation: false,
    important: 'important',
    date: '2017-04-03',
    time: '',
    dateEnd: ''
  },
  {
    id: 2,
    label: 'Удалить задачу',
    description: 'Удалить созданую задачу и узнать что будет',
    success: false,
    viewInformation: false,
    important: 'veryImportant',
    date: '2017-04-03',
    time: '',
    dateEnd: ''
  }
]

const defaultItem = {
  label: '',
  description: '',
  important: 'regular',
  date: '',
  time: '',
  dateEnd: '',
  success: false,
  viewInformation: false,
}

const initialState = {
  items: [...defaultItems],
  openPopup: false,
  formItem: {...defaultItem},
  filters: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case actionTypes.TOGGLE_POPUP:
    return {
      ...state,
      openPopup: !state.openPopup
    }
  
  case actionTypes.CHANGE_FORM_POPUP:
    return {
      ...state,
      formItem: {...state.formItem, ...action.formItem}
    }

  case actionTypes.RESET_FORM_ITEM:
    return {
      ...state,
      formItem: {...defaultItem}
    }

  case actionTypes.SAVE_ITEM:
    return {
      ...state,
      items: [
        ...state.items,
        { id: state.items.length, ...state.formItem }
      ],
      formItem: {...defaultItem},
      openPopup: false
    }

  case actionTypes.CHANGE_ITEMS:
    return {
      ...state,
      items: [...action.items],
      openPopup: false
    }

  case actionTypes.CHANGE_FORM_ITEM:
    return {
      ...state,
      formItem: {...action.formItem}
    }

  case actionTypes.SET_FILTERS:
    return {
      ...state,
      filters: [...action.filters]
    }

  default:
    return state
  }
}

export default reducer