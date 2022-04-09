import React, { useContext, useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import './styles.scss';

let allZones = [];
let zoneList = [];

const DropdownZones = props => {
    const { electionYear, CountryTopoJson, setZone, zone, setProvince, province } = useContext(MapContext);

    const [filter, setFilter] = useState('');
    const [dropdownZones, setDropdownZones] = useState([]);
    const {
        ref,
        isComponentVisible: showItems,
        setIsComponentVisible: setShowItems
    } = useComponentVisible(false);
    const searchRef = useRef(null);

    useEffect(() => {
        if (CountryTopoJson.length === 0) return;
        allZones = Array.from(
            new Set(
                CountryTopoJson.objects[electionYear].geometries.map(
                    d => ({
                        province_name: d.properties.province_name,
                        zone_name: d.properties.zone_name
                    })
                )
            )
        ).sort();
        zoneList = allZones;
        setDropdownZones(allZones);
    }, [electionYear, CountryTopoJson]);

    useEffect(() => {
        const filteredZone = zoneList.filter(zone =>
            zone.zone_name.includes(filter)
        );
        setDropdownZones(filteredZone);
    }, [filter]);

    useEffect(() => {
        setFilter('');
        if (showItems) searchRef.current.focus();
    }, [showItems]);

    useEffect(() => {
        if (province === 'ประเทศไทย') {
            allZones = zoneList;
            setZone('เขต');
        } else {
            allZones = zoneList.filter(data => data.province_name === province);
        }
        setDropdownZones(allZones);
    }, [props.province])

    return (
        <div className="dropdown--container" ref={ref}>
            <div
                className={`dropdown--button-zone ${`${zone}` !==
                'เขต' && 'dropdown--button-zone__active'}`}
                onClick={() => setShowItems(prev => !prev)}>
                {props.children}
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
                                placeholder="พิมพ์เขต"
                                ref={searchRef}
                            />
                        </div>
                        {dropdownZones.map(({ zone_name, province_name }) => (
                            <div
                                className="dropdown--item"
                                key={zone_name}
                                onClick={() => {
                                    setZone(zone_name);
                                    setProvince(province_name);
                                    setShowItems(prev => !prev);
                                }}
                            >
                                {zone_name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


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

export default withRouter(DropdownZones);
