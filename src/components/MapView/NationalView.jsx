import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import MapContext from '../../map/context';
import { device } from '../size';
import Scope from './Scope';
import partyLogo from '../../map/logo';

const NationalLeft = () => {
    return <Scope />
};

const Loader = styled.div`
  width: 100%;
  height: 300px;
  textAlign: center;

  h1 {
    font-size: 3rem;
    line-height: 30rem;
    text-align: center;
  }

  @media ${device.tablet} {
    h1 {
      line-height: 10rem;
    }
  }
`;

const NationalRight = ({ toggleShowDetail, partyChanged }) => {
    const { setProvince, CountryTopoJson, electionYear } = useContext(MapContext);
    const [nationalProps, setNationalProps] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setProvince('ประเทศไทย');
    }, []);

    useEffect(() => {
        if (CountryTopoJson.length === 0) return;
        const nationalProps = CountryTopoJson.objects[electionYear].geometries.map(
            geo => geo.properties
        );
        setNationalProps(nationalProps);
    }, [CountryTopoJson, electionYear]);

    let byParty = {};
    nationalProps.map(cur => {
        if (!cur.result) {
            byParty['noresult'] = 'No vote';
            return;
        }
        cur.result
            .sort((a, b) => b.score - a.score)
            .slice(0, cur.quota)
            .map(person => {
                if (!(person.party in byParty)) {
                    byParty[person.party] = [person];
                } else {
                    byParty[person.party] = [...byParty[person.party], person];
                }
            });
    });

    let byPartySorted = [];
    for (let [party, winnerResult] of Object.entries(byParty)) {
        byPartySorted.push({ party, candidate: winnerResult.length });
    }
    byPartySorted.sort((a, b) => b.candidate - a.candidate);

    return (
        <div>
            {isLoading ? (
                <Loader>
                    <h1>
                        กำลังโหลดข้อมูล
                    </h1>
                </Loader>
            ) : (
                <div className="national-view">
                    <div className="national-view--content">
                        <ul className="party-list--list">
                            {byPartySorted.map(({ party, candidate }) => (
                                <li key={party} className="party-list--list-item" onClick={() => partyChanged(party)}>
                                    <span
                                        className="party-list--party-box"
                                        style={{
                                            backgroundColor: '#fff',
                                            backgroundImage: 'url(' + process.env.PUBLIC_URL + '/logo/' + partyLogo(electionYear)(party) + ')',
                                            backgroundSize: '1.5rem'
                                        }}
                                    ></span>
                                    <a style={{ verticalAlign: 'super' }} >พรรค{party}</a>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export { NationalLeft, NationalRight };
