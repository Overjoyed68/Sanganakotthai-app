import React, { useEffect, useContext } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import DropdownProvinces from '../DropdownProvinces';
import DropdownZones from '../DropdownZones';

const Scope = props => {
    const { province, setProvince, zone } = useContext(MapContext);

    return (
        <div>
            <div className='year-choice--list'>
                <div
                    className={`year-choice--list-item ${`${province}` ===
                        'ประเทศไทย' && `${zone}` ==='เขต' && 'year-choice--list-item__active'}`}
                    onClick={() => { props.history.push(`/2562`); setProvince('ประเทศไทย'); }}>
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