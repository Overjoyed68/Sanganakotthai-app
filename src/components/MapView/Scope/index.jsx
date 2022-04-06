import React, { useEffect, useContext } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import MapContext from '../../../map/context';
import Dropdown from '../Dropdown';
// import { ELECTION_SCOPE } from './../../../config';

const Scope = props => {
    const { scope: paramScope } = useParams();
    const { province, scope, setScope } = useContext(MapContext);

    useEffect(() => {
        if (!paramScope) return;
        setScope(`${paramScope}`);
    }, [paramScope]);

    return (
        <div>
            <div className='year-choice--list'>
                <div className='year-choice--list-item' onClick={() => { props.history.push(`/2562`) }}>
                    ประเทศไทย
                </div>

                <div>
                    <Dropdown >{province}</Dropdown>
                </div>

                {/* <button className='year-choice--list-item'>
                    เขต
                </button> */}
            </div>
        </div>
    )
}

export default withRouter(Scope)