import React from 'react';
import './filter.css';

const checkboxFilter = [
  {
    value: 'regular',
    label: 'Обычные'
  },
  {
    value: 'important',
    label: 'Важные'
  },
  {
    value: 'veryImportant',
    label: 'Очень важные'
  },
]

const Filter = ({setFilter, setFilterAll, filters, filterAll}) => {
  const classNamesFilterAll = `filterItem firstLetterBug ${filterAll ? 'active' : ''}`;
  return (
    <div className="filter">
      Показать:
      <div className="filterGroup">

        <label className={classNamesFilterAll}>
          Все
          <input type="checkbox" value="all" onChange={setFilterAll} checked={filterAll} />
        </label>
        
        {
          checkboxFilter.map((item, index) => {
            const filterClass = `filterItem ${item.value}-border ${filters.includes(item.value) ? `active ${item.value}` : ''}`;
            return (
            <label key={index} className={filterClass}>
              {item.label}
              <input type="checkbox" value={item.value} onChange={setFilter} checked={filters.includes(item.value)} />
            </label>)
          })
        }
      </div>
    </div>
  )
}

export default Filter;