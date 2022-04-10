import React, { useContext } from 'react';
import './styles.scss';
import partyColor from '../../../map/color';
import MapContext from '../../../map/context';
import partyLogo from '../../../map/logo';

const Overview = ({ waffleData, view }) => {
  const { electionYear } = useContext(MapContext);
  const width = view === 'nationView' ? 8 : 15;
  const height = view === 'nationView' ? 8 : 15;
  return (
    <div className="overview">
      <h2 className="overview--header">Overview</h2>
      <div className="waffle">
        {waffleData.map(d => {
          const [party, count] = Object.values(d);
          return [...Array(count).keys()].map(i => (
            <div
              key={party + i}
              className="waffle--waffle"
              style={{
                backgroundColor: '#fff',
                backgroundImage: 'url(' + process.env.PUBLIC_URL + '/logo/' + partyLogo(electionYear)(party) + ')',
                backgroundSize: '1.5rem',
                width: '1.5rem',
                height: '1.5rem',
                margin: '0.2rem'
              }}
            >
              <span
                className="waffle--waffle__tooltiptext"
                style={{ zIndex: '5' }}
              >
                <span
                  className="waffle--waffle__tooltipcolor"
                  style={{
                    display: 'inline-block',
                    // backgroundColor: partyColor(electionYear)(party),
                    width: '1rem',
                    height: '1rem',
                    marginRight: '.5rem'
                  }}
                ></span>
                {party}
              </span>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default Overview;
