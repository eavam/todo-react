import React from 'react';
import './form.css';


const taskImportants = [
  {
    label: 'Обычная',
    value: 'regular'
  },
  {
    label: 'Важная',
    value: 'important'
  },
  {
    label: 'Очень важная',
    value: 'veryImportant'
  }
]

const AddForm = ({ addListItem, saveItem, closeForm, setValue, newItem, type }) => {
  return (
    <form onSubmit={ type === 'add' ? addListItem : saveItem } className="newItemForm">
      <div className="formItems">

        <div className="closeForm" onClick={closeForm}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><path fill="#ffffff" d="M42 20H22V0h-2v20H0v2h20v20h2V22h20z"/></svg>
        </div>

        <textarea
          onChange={e => setValue(e, 'label')}
          className="editTitle"
          placeholder="Заголовок"
          required
          value={newItem.label}>
        </textarea>

        <textarea
          onChange={e => setValue(e, 'description')}
          className="editDescription"
          placeholder="Описание"
          required
          value={newItem.description}>
        </textarea>

        <div className="formColums">
          <div className="columsGroup">
            <div className="columnTitle">Важность задачи</div>
            <div className="importantsGroupWrapper">
              {
                taskImportants.map((taskImpotantItem, i) =>
                  <label key={i}>
                    <input
                      type="radio"
                      name="importants"
                      value={taskImpotantItem.value}
                      onChange={e => setValue(e, 'important')}
                      checked={taskImpotantItem.value === newItem.important}
                    />
                    <div className={`choiceColor ${taskImpotantItem.value}`}></div>
                    {taskImpotantItem.label}
                  </label>
                )
              }
            </div>
          </div>
          <div className="columsGroup">
            <div className="columnTitle">Дата и время выполнения</div>
            <input type="date" onChange={e => setValue(e, 'date')} value={newItem.date}/>
            <input type="time" onChange={e => setValue(e, 'time')} value={newItem.time}/>
          </div>
        </div>
        <button className="btn">
          { type === 'add' ? 'Добавить' : 'Сохранить' }
        </button>
      </div>
    </form>
  );
};

export default AddForm;

