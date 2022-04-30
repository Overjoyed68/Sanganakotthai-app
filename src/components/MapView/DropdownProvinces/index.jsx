import React, { useContext, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

let allProvinces = [];

const DropdownProvinces = props => {
  const { electionYear, province, setProvince, CountryTopoJson } = useContext(MapContext);
  const [filter, setFilter] = useState('');
  const [dropdownProvinces, setDropdownProvinces] = useState([]);
  const {
    ref,
    isComponentVisible: showItems,
    setIsComponentVisible: setShowItems
  } = useComponentVisible(false);
  const searchRef = useRef(null);
  const year = electionYear.substring(electionYear.length - 4);
  const { setNumberOfVoter } = useContext(MapContext)

  useEffect(() => {
    if (CountryTopoJson.length === 0) return;
    allProvinces = Array.from(
      new Set(
        CountryTopoJson.objects[electionYear].geometries.map(
          d => d.properties.province_name
        )
      )
    ).sort();

    allProvinces.unshift('ประเทศไทย');
    setDropdownProvinces(allProvinces);
  }, [electionYear, CountryTopoJson]);

  useEffect(() => {
    const filteredProvince = allProvinces.filter(province =>
      province.includes(filter)
    );
    setDropdownProvinces(filteredProvince);
  }, [filter]);

  useEffect(() => {
    setFilter('');
    if (showItems) searchRef.current.focus();
  }, [showItems]);

  const onProvinceChanged = (province) => {
    setProvince(province);
    if (province === 'ประเทศไทย') {
      setNumberOfVoter(51214120);
      props.history.push(`/${year}`)
    } else {
      props.history.push(`/${year}/${province}`);
    }
  }

  return (
    <div className="dropdown--container" ref={ref}>
      <div
        className={`dropdown--button ${`${province}` !==
          'ประเทศไทย' && 'dropdown--button__active'}`}
        onClick={() => setShowItems(prev => !prev)}>
        {props.children === 'ประเทศไทย' ? 'จังหวัด' : props.children}
        <i className="dropdown--chevron"></i>
      </div>
      {showItems && (
        <div className="dropdown--items">
          <div className="dropdown--items-wrapper">
            <div className="dropdown--search">
              <input
                type="text"
                className="dropdown--search-input"
                onChange={e => setFilter(e.target.value)}
                placeholder="พิมพ์จังหวัด"
                ref={searchRef}
              />
            </div>
            {dropdownProvinces.map(province => (
              <div
                className="dropdown--item"
                key={province}
                onClick={() => {
                  setShowItems(prev => !prev);
                  onProvinceChanged(province)
                }}
              >
                {province}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

export default withRouter(DropdownProvinces);
