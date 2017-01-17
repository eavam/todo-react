import React from 'react';
import './list.css';
import fire from './fire.png';

const stylesText = {
  color: '#d9d9d9',
  textDecoration: 'line-through'
}

const stylesSuccess = {
  fill: '#22c522'
}

const styleFire = {
  background: `url(${fire}) no-repeat center center`,
  backgroundSize: 'cover'
}

const styleInformation = {
  display: 'none'
}

const now = new Date().valueOf();

const List = ({ listItems, removeItem, checkSuccess, viewInformation, editItem, filter }) => {
  return (
    <ul className="listItems">
      { 
        listItems.map((item, i) => {
          if( filter.length !== 0 && !filter.includes(item.important) ) return false;
          return (
            <li key={i} className="listItemWrapper" style={ item.timestamp < now && !item.success ? styleFire : {} }>
              <div className="listItem">
                <span className={`${item.important} listItemImportant`}></span>
                <div className="iconBtn" onClick={e => checkSuccess(e, i)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style={ item.success ? stylesSuccess : {} }>
                    <path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"/>
                    {
                        item.success
                      ?
                        <path d="M38.252 15.336l-15.369 17.29-9.259-7.407a1 1 0 0 0-1.249 1.562l10 8a.999.999 0 0 0 1.373-.117l16-18a1 1 0 1 0-1.496-1.328z"/>
                      :
                        null
                    }
                  </svg>
                </div>

                <div className="listItemText">
                  <div className="listItemLabel" style={ item.success ? stylesText : {} } onClick={e => viewInformation(e, i)} >
                    {item.label}
                  </div>
                  <div className="listItemInformation" style={ item.viewInformation ? {} : styleInformation }>
                    <div className="listItemDescription">
                      Описание: <br/>
                      {item.description}
                    </div>
                    { 
                        item.date
                      ?
                        <div className="listItemTime">
                          Дедлайн: { `${item.date} ${item.time}` }
                        </div>
                      :
                        null
                    }
                    { 
                        item.timeEnd
                      ?
                        <div className="listItemTime">
                          Задача выполнена: { item.timeEnd }
                        </div>
                      :
                        null
                    }
                  </div>
                </div>
                <div className="iconBtn hoverVisible" onClick={e => editItem(e, i)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.25 55.25">
                    <path d="M52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 0 0-.125.239c-.009.026-.022.049-.029.075l-.012.03-3.535 14.85a.991.991 0 0 0-.022.202c0 .013-.004.025-.004.038a.995.995 0 0 0 .095.403c.049.107.11.21.196.296a1.006 1.006 0 0 0 .938.266l14.85-3.535c.027-.006.051-.021.077-.03a.985.985 0 0 0 .3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02L52.617 15.36c3.51-3.51 3.51-9.22.001-12.729zm-1.414 1.414c2.488 2.489 2.7 6.397.65 9.137l-9.787-9.787c2.741-2.05 6.649-1.838 9.137.65zm-4.95 14.85l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zM4.961 50.288a.999.999 0 0 0-1.414 0l-.757.757 2.554-10.728 4.422-.491-.569 5.122c-.004.038.01.073.01.11 0 .038-.014.072-.01.11.004.033.021.06.028.092a1.016 1.016 0 0 0 .245.473c.048.051.1.094.157.134.045.031.088.06.138.084.066.031.135.049.207.066.038.009.069.03.108.035a.982.982 0 0 0 .109.006h.004a.995.995 0 0 0 .109-.006l5.122-.569-.491 4.422-10.729 2.554.757-.757a1 1 0 0 0 0-1.414zm12.55-5.479L39.889 22.43a.999.999 0 1 0-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 1 0-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683.354-3.183zm31.571-28.742l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z"/>
                  </svg>
                </div>
                <div className="iconBtn hoverVisible" onClick={e => removeItem(e, i)}>
                  <svg className="iconAdd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                    <path d="M42 20H22V0h-2v20H0v2h20v20h2V22h20z"/>
                  </svg>
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>
  );
};

export default List;