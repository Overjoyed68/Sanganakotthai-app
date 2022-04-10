import React, { useContext, useEffect } from 'react';
import MapContext from '../../../map/context';
import partyLogo from '../../../map/logo';
import './styles.scss';

const PartyList = ({ byPartySorted, view, partyChanged }) => {
  const { electionYear } = useContext(MapContext);

  return (
    <ul className="party-list--list">
      {byPartySorted.map(({ party, candidate }) => (
        <li key={party} className="party-list--list-item">
          <span
            className="party-list--party-box"
            style={{
              backgroundColor: '#fff',
              backgroundImage: 'url(' + process.env.PUBLIC_URL + '/logo/' + partyLogo(electionYear)(party) + ')',
              backgroundSize: '1.5rem'
            }}
          ></span>
          <a style={{ verticalAlign: 'super' }} onClick={() => partyChanged(party)}>พรรค{party}</a>
          {' '}
          <span className="party-list--count">
            {' '}
            <span style={{ fontWeight: 500 }}>
              {candidate}
            </span>{' '}
            คน
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PartyList;
