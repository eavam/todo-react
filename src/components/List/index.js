import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SuccessIcon from './SuccesIcon';
import EditIcon from './EditIcon';
import RemoveIcon from './RemoveIcon';
import fire from './fire.png';

const Root = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 0;
`;

const ItemWrap = styled.li`
  border: 2px solid #d9d9d9;
  border-bottom: 0;
  overflow: hidden;
  ${props => props.success && `
    background: url(${fire}) no-repeat center center;
    background-size: 'cover';
  `}

  &:first-child {
    border-radius: 7px 7px 0 0;
  }

  &:last-child {
    border-radius: 0 0 7px 7px;
    border-bottom: 2px solid #d9d9d9;
  }
`;
const Item = styled.div`
  padding: 1.2rem;
  padding-left: 3rem;
  font-size: 3.4rem;
  text-align: left;
  display: flex;
  user-select: none;
  position: relative;

  &:hover * {
    visibility: visible;
    opacity: 1;
  }
`;
const regularStyle = `
  background: #009fff;
`;
const importantStyle = `
  background: #ffe100;
`;
const veryImportantStyle = `
  background: #ff2500;
`;
const LeftBorder = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  width: 2rem;
  bottom: 0;
  ${props =>
    (props.theme === 'regular'
      ? regularStyle
      : props.theme === 'important'
        ? importantStyle
        : props.theme === 'veryImportant'
          ? veryImportantStyle
          : '')}
`;
const Icon = styled.div`
  border: 0;
  background: none;
  margin-right: 1.4rem;
  cursor: pointer;
  outline: none;

  &:last-child {
    margin-right: 0;
  }

  & svg {
    width: 36px;
    height: 36px;
  }
`;
const ItemText = styled.div`
  flex: 1;
  margin-right: 1.4rem;
`;
const ItemLabel = styled.div`
  cursor: pointer;
  ${props => props.success && `
    color: #d9d9d9;
    text-decoration: line-through;
    `}
`;
const ItemInfo = styled.div`
  font-size: 2rem;
  ${props => !props.view && 'display: none;'}
`;
const ItemDescription = styled.div`
  margin: 2rem 0;
`;
const IconHidden = styled(Icon)`
  visibility: hidden;
  opacity: 0;
`;

const now = new Date().valueOf();

const List = ({
  filters, items, toggleSuccessItem, toggleViewItem, editItem, removeItem,
}) => (
  <Root>
    { items
        .filter(item => filters.length === 0 || filters.includes(item.important))
        .map(item => (
          <ItemWrap key={item.id} success={item.timestamp < now && !item.success}>
            <Item>
              <LeftBorder theme={item.important} />
              <Icon onClick={() => toggleSuccessItem(item.id)}>
                <SuccessIcon success={item.success} />
              </Icon>

              <ItemText>
                <ItemLabel success={item.success} onClick={() => toggleViewItem(item.id)} >
                  {item.label}
                </ItemLabel>
                <ItemInfo view={item.viewInformation}>
                  <ItemDescription>
                    <p>Описание:</p>
                    {item.description}
                  </ItemDescription>
                  { item.date
                      && <div>Дедлайн: { `${item.date} ${item.time}` }</div>
                    }
                  { item.dateEnd
                      && <div>Задача выполнена: { item.dateEnd }</div>
                    }
                </ItemInfo>
              </ItemText>
              <IconHidden onClick={() => editItem(item.id)}>
                <EditIcon />
              </IconHidden>
              <IconHidden onClick={() => removeItem(item.id)}>
                <RemoveIcon />
              </IconHidden>
            </Item>
          </ItemWrap>
          ))
      }
  </Root>
);

List.propTypes = {
  items: PropTypes.array,
  toggleSuccessItem: PropTypes.func,
  toggleViewItem: PropTypes.func,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  filters: PropTypes.array,
};

export default List;
