import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

const AddForm = ({ saveItem, formItem, changeFormPopup, togglePopup }) => {
  return (
    <Root onSubmit={saveItem}>
      <Item>

        <Close onClick={togglePopup}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 42 42'><path fill='#ffffff' d='M42 20H22V0h-2v20H0v2h20v20h2V22h20z'/></svg>
        </Close>

        <Title
          onChange={changeFormPopup}
          value={formItem.label}
          name='label'
          placeholder='Заголовок'
          required
        />

        <Description
          onChange={changeFormPopup}
          value={formItem.description}
          name='description'
          placeholder='Описание'
          required
        />

        <Columns>
          <GroupColumns>
            <ColumnTitle>Важность задачи</ColumnTitle>
            <Importants>
              { taskImportants.map((taskImpotantItem, i) =>
                  <ImportantsLabel key={i}>
                    <ImportantsImput
                      onChange={changeFormPopup}
                      value={taskImpotantItem.value}
                      checked={taskImpotantItem.value === formItem.important}
                      name='important'
                      type='radio'
                    />
                    <ImportantsColor theme={taskImpotantItem.value} active={taskImpotantItem.value === formItem.important} />
                    {taskImpotantItem.label}
                  </ImportantsLabel>
                )
              }
            </Importants>
          </GroupColumns>
          <GroupColumns>
            <ColumnTitle>Дата и время выполнения</ColumnTitle>
            <input type='date' name='date' onChange={changeFormPopup} value={formItem.date}/>
            <input type='time' name='time' onChange={changeFormPopup} value={formItem.time}/>
          </GroupColumns>
        </Columns>
        <button className='btn'>Сохранить</button>
      </Item>
    </Root>
  )
}

AddForm.propTypes = {
  changeFormPopup: PropTypes.func,
  formItem: PropTypes.object,
  togglePopup: PropTypes.func,
  saveItem: PropTypes.func,
}

export default AddForm

const Root = styled.form`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  background: rgba(0,0,0,.75);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  padding: 3rem 0;
`
const Item = styled.div`
  position: relative;
  width: 750px;
  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    width: 100%;
  }
`
const Text = styled.textarea`
  border: 0;
  outline: none;
  padding: 1.2rem;
  font-size: 2rem;
  resize: none;
  box-shadow: inset 0px -2px 0 rgba(0,0,0,.15);
  font-family: 'Comfortaa', cursive;
`
const Title = styled(Text)`
  border-radius: 3px 3px 0 0;
  min-height: 3em;
`
const Description = styled(Text)`
  min-height: 8em;
`
const Close = styled.div`
  position: absolute;
  right: 0;
  top: -2.5rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;

  & svg {
    width: 100%;
    height: 100%;
    transform: rotateZ(45deg);
  }
`
const Columns = styled.div`
  display: flex;
`
const GroupColumns = styled.div`
  width: 50%;
  background: #fff;
  padding: 1.2rem;

  &:first-child {
    box-shadow: inset -1px 0 0 rgba(0,0,0,.15);
    border-bottom-left-radius: 3px;
  }

  &:last-child {
    box-shadow: inset 1px 0 0 rgba(0,0,0,.15);
    border-bottom-right-radius: 3px
  }
`
const ColumnTitle = styled.div`
  margin-bottom: .5rem;
`
const Importants = styled.div`
  display: flex;
  justify-content: space-between;
`
const ImportantsImput = styled.input`
  display: none;
`
const ImportantsLabel = styled.label`
  width: 33%;
  text-align: center;
  cursor: pointer;
`
const regularStyle = `
  background: #009fff;
`
const importantStyle = `
  background: #ffe100;
`
const veryImportantStyle = `
  background: #ff2500;
`
const ImportantsColor = styled.div`
  display: block;
  width: 100%;
  height: 2rem;
  border-radius: 3px;
  margin-bottom: .5rem;
  opacity: ${props => props.active ? '1' : '.4'};
  ${props =>
    props.theme === 'regular'
    ? regularStyle
    : props.theme === 'important'
    ? importantStyle
    : props.theme === 'veryImportant'
    ? veryImportantStyle
    : ''
    }
`