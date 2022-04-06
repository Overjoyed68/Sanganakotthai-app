import React, { useContext, useEffect } from 'react';
import MapContext from '../../../map/context';
import partyColor from '../../../map/color';
import './styles.scss';

const PartyList = ({ byPartySorted, view, partyChanged}) => {
  const { electionYear } = useContext(MapContext);

  return (
    <ul className="party-list--list">
      {byPartySorted.map(({ party, candidate }) => (
        <li key={party} className="party-list--list-item">
          <span
            className="party-list--party-box"
            style={{
              backgroundColor: partyColor(electionYear)(party)
            }}
          ></span>
          <a onClick={() => partyChanged(party)}>พรรค{party}</a>
          {' '}
          <span className="party-list--count">
            {' '}
            <span style={{ fontFamily: 'Noto Sans', fontWeight: 500 }}>
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
