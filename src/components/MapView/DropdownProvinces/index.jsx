import React, { useContext, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';
import { API_URL } from '../../../config';

let allProvinces = [];

const DropdownProvinces = props => {
  const { electionYear, province, setProvince, CountryTopoJson, setProvinceData } = useContext(MapContext);
  const [filter, setFilter] = useState('');
  const [dropdownProvinces, setDropdownProvinces] = useState([]);
  const {
    ref,
    isComponentVisible: showItems,
    setIsComponentVisible: setShowItems
  } = useComponentVisible(false);
  const searchRef = useRef(null);
  const year = electionYear.substring(electionYear.length - 4);
  const { setLoading } = useContext(MapContext);
  const { setNumberOfVoter, numberOfVoter } = useContext(MapContext)

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

  const getNumberOfVoter = (province) => {
    let selectedProvinceData = 0;
    if (province === 'ประเทศไทย') {
      setNumberOfVoter(51214120);
    } else {
      selectedProvinceData = CountryTopoJson.objects[electionYear].geometries.find(data => data.properties.province_name === province);
      setNumberOfVoter(selectedProvinceData.properties.number_of_vote_per_province);
    }
  }

  const onProvinceChanged = (province) => {
    setLoading(true);
    setProvince(province);
    getNumberOfVoter(province);
    province === 'ประเทศไทย'
      ? props.history.push(`/${year}`)
      : props.history.push(`/${year}/${province}`);
    fetch(API_URL.PROD_URL + '/dashboard/' + province + '/0')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setProvinceData(data.data);
        }
      })
      .finally(setLoading(false));
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
