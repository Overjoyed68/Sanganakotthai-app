import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import DropdownProvinces from '../DropdownProvinces';
import DropdownZones from '../DropdownZones';
import { API_URL } from '../../../config';

const Scope = props => {
    const { province, setProvince, zone } = useContext(MapContext);
    const { setCountryData } = useContext(MapContext);
    const { setLoading } = useContext(MapContext);
    const { setNumberOfVoter } = useContext(MapContext);

    useEffect(() => {
        onCountrySelected();
    }, [])

    const onCountrySelected = () => {
        setLoading(true);
        props.history.push('/2562');
        setNumberOfVoter(51214120);
        setProvince('ประเทศไทย');
        fetch(API_URL.PROD_URL + '/dashboard/thailand')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setCountryData(data.data);
                }
            })
            .finally(setLoading(false));
    }

    return (
        <div>
            <div className='year-choice--list'>
                <div
                    className={`year-choice--list-item ${`${province}` ===
                        'ประเทศไทย' && `${zone}` === 'เขต' && 'year-choice--list-item__active'}`}
                    onClick={() => { onCountrySelected() }}>
                    ประเทศไทย
                </div>

                <div>
                    <DropdownProvinces>{province}</DropdownProvinces>
                </div>

                <div>
                    <DropdownZones province={province}>{zone}</DropdownZones>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Scope)