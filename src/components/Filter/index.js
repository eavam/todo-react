import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const checkboxFilter = [
  {
    value: 'regular',
    label: 'Обычные',
  },
  {
    value: 'important',
    label: 'Важные',
  },
  {
    value: 'veryImportant',
    label: 'Очень важные',
  },
];

const Root = styled.div`
  text-align: left;
`;
const Group = styled.div`
  margin-top: 0.7rem;
  display: flex;
  align-items: center;
`;
const Lable = styled.div`
  margin-right: 10px;
`;
const FilterItem = styled.label`
  padding: 0.3rem 1rem;
  border: 1px solid;
  border-radius: 3px;
  margin-right: 0.4rem;
  cursor: pointer;
  user-select: none;
  color: ${props => (props.active ? '#fff' : '#000')};
`;
const AllFilter = styled(FilterItem)`
  background: ${props => (props.active ? '#000' : '#fff')};

  &:first-letter {
    display: inline-block;
  }
`;
const regularStyle = `
  background: #009fff;
  border-color: #009fff;
`;
const importantStyle = `
  background: #ffe100;
  border-color: #ffe100;
`;
const veryImportantStyle = `
  background: #ff2500;
  border-color: #ff2500;
`;
const defaultStyle = `
  background: #fff;
  border-color: #000;
`;

const selectTheme = (props) => {
  if (!props.active) return defaultStyle;

  switch (props.theme) {
    case 'regular':
      return regularStyle;

    case 'important':
      return importantStyle;

    case 'veryImportant':
      return veryImportantStyle;

    default:
      return defaultStyle;
  }
};

const FilterLabel = styled(FilterItem)`
  ${selectTheme};
`;
const Input = styled.input`
  display: none;
`;

const Filter = ({ filters, filterChange }) => {
  const activeAll = filters.length === 0;
  return (
    <Root>
      <Group>
        <Lable>Показать:</Lable>
        <AllFilter active={activeAll}>
          Все
          <Input type="checkbox" value="all" onChange={filterChange} checked={activeAll} />
        </AllFilter>
        {checkboxFilter.map((item) => {
          const active = filters.includes(item.value);
          return (
            <FilterLabel key={item.value} theme={item.value} active={active}>
              {item.label}
              <Input type="checkbox" value={item.value} onChange={filterChange} checked={active} />
            </FilterLabel>
          );
        })}
      </Group>
    </Root>
  );
};

Filter.propTypes = {
  filterChange: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
};

export default Filter;
