import * as actionTypes from '../../actionTypes'
import moment from 'moment'

export function togglePopup() {
  return {
    type: actionTypes.TOGGLE_POPUP
  }
}

export function changeFormPopup(formItem) {
  return {
    type: actionTypes.CHANGE_FORM_POPUP,
    formItem
  }
}

function save() {
  return {
    type: actionTypes.SAVE_ITEM
  }
}

function resetFormItem() {
  return {
    type: actionTypes.RESET_FORM_ITEM
  }
}

function saveChange() {
  return (dispatch, getState) => {
    const { items, formItem } = getState()
    const mapItems = items.map(el => el.id === formItem.id ? { ...formItem } : el)
    dispatch(changeItems(mapItems))
    dispatch(resetFormItem())
  }
}

export function saveItem() {
  return (dispatch, getState) => {
    const { formItem } = getState()
    if(formItem.id !== undefined) dispatch(saveChange())
    else dispatch(save())
  }
}

export function toggleSuccessItem(id) {
  return (dispatch, getState) => {
    const { items } = getState()
    const mapItems = items.map(el => {
      return el.id === id
      ? { ...el, success: !el.success, dateEnd: !el.success ? moment().format('YYYY-MM-DD HH:mm') : '' }
      : el
    })
    dispatch(changeItems(mapItems))
  }
}

export function toggleViewItem(id) {
  return (dispatch, getState) => {
    const { items } = getState()
    const mapItems = items.map(el => el.id === id ? { ...el, viewInformation: !el.viewInformation } : el)
    dispatch(changeItems(mapItems))
  }
}

export function editItem(id) {
  return (dispatch, getState) => {
    const { items } = getState()
    const findItem = items.find(el => el.id === id)
    dispatch(changeFormItem(findItem))
  }
}

export function removeItem(id) {
  return (dispatch, getState) => {
    const { items } = getState()
    const filterItems = items.filter(el => el.id !== id)
    dispatch(changeItems(filterItems))
  }
}

function changeItems(items) {
  return {
    type: actionTypes.CHANGE_ITEMS,
    items
  }
}

function changeFormItem(formItem) {
  return {
    type: actionTypes.CHANGE_FORM_ITEM,
    formItem
  }
}

export function filterChange(filter) {
  return (dispatch, getState) => {
    const { filters } = getState()

    if(filter === 'all') {
      dispatch(setFilters([]))
    } else {
      const filterIndex = filters.indexOf(filter)
      filterIndex === -1
      ? dispatch(setFilters([...filters, filter]))
      : dispatch(setFilters(filters.filter(el => el !== filter)))
    }

  }
}

function setFilters(filters) {
  return {
    type: actionTypes.SET_FILTERS,
    filters
  }
}