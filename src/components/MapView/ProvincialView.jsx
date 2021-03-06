import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import MapContext from '../../map/context';
import Overview from './Overview';
import PartyList from './PartyList';

import ProvinceAreaCompare from './ProvincialViewDetail/ProvinceAreaCompare.jsx';
import { device } from '../size';
import { API_URL } from '../../config';


const ProvincialLeft = () => {
    const { province: paramProvince, zone: paramZone } = useParams();
    const { setProvince, setZone, setNumberOfVoter, CountryTopoJson, setLoading, setProvinceData, setZoneData } = useContext(MapContext);



    function getNumberOfVoterPerProvince(province_name) {
        const data = getProvinceData(province_name);
        const numberOfVoter = data.properties.number_of_vote_per_province || 0;
        setNumberOfVoter(numberOfVoter);
    }

    function getNumberOfVoterPerZone(province_name, zone_name) {
        const data = getZoneData(province_name, zone_name);
        const numberOfVoter = data.properties.number_of_vote_per_zone || 0;
        setNumberOfVoter(numberOfVoter);
    }

    function getProvinceDataByAPI(province_name) {
        setLoading(true);
        fetch(API_URL.PROD_URL + '/dashboard/' + province_name + '/0')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setProvinceData(data.data);
                }
            })
            .finally(setLoading(false));
    }

    function getZoneDataByAPI(province_name, zone_name) {
        const zone_id = getZoneId(province_name, zone_name);
        setLoading(true);
        fetch(API_URL.PROD_URL + '/dashboard/' + province_name + '/' + zone_id)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setZoneData(data.data);
                }
            })
            .finally(setLoading(false));
    }

    function getZoneId(province_name, zone_name) {
        const data = getZoneData(province_name, zone_name);
        const zone_id = data.properties.zone_id;
        return zone_id;
    }

    function getProvinceData(province_name) {
        const provinceData = CountryTopoJson.objects['election-2562'].geometries.find(data => data.properties.province_name === province_name);
        return provinceData;
    }

    function getZoneData(province_name, zone_name) {
        const zoneData = CountryTopoJson.objects['election-2562'].geometries.find(data => data.properties.province_name === province_name && data.properties.zone_name === zone_name);
        return zoneData;
    }

    useEffect(() => {
        if (!paramProvince) return;
        setProvince(paramProvince);
        getProvinceDataByAPI(paramProvince);
        getNumberOfVoterPerProvince(paramProvince);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramProvince]);

    useEffect(() => {
        if (!paramZone) return;
        setZone(paramZone);
        getZoneDataByAPI(paramProvince, paramZone);
        getNumberOfVoterPerZone(paramProvince, paramZone)
    }, [paramZone])
    return <ProvinceAreaCompare />;
};

const ToggleButton = styled.a`
  display: none;

  @media ${device.tablet} {
    display: block;
    float: right;
    line-height: 1;
    transform: rotate(180deg);
    transition: transform .4s ease-out;
    margin-top: 0.3rem;

    i {
      border: none;
    }

    .show-info & {
      transform: rotate(0);
    }
  }
`;

const ProvincialRight = ({ toggleShowDetail, partyChanged }) => {
    const { province, electionYear, CountryTopoJson } = useContext(MapContext);
    const [provincialProps, setProvincialProps] = useState([]);
    const numDistricts = provincialProps.length;

    useEffect(() => {
        if (CountryTopoJson.length === 0) return;
        const provincialProps = CountryTopoJson.objects[electionYear].geometries
            .filter(geo => geo.properties.province_name === province)
            .map(geo => geo.properties);

        provincialProps.sort((a, b) => a.zone_id - b.zone_id);
        setProvincialProps(provincialProps);
    }, [CountryTopoJson, province, electionYear]);
    const numCandidate = provincialProps.reduce((acc, cur) => {
        return acc + cur.quota;
    }, 0);
    let byParty = {};
    provincialProps.forEach(cur => {
        if (!cur.result) {
            byParty['noresult'] = 'No vote';
            return;
        }
        cur.result
            .sort((a, b) => b.score - a.score)
            .slice(0, cur.quota)
            .forEach(person => {
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
        <div className="provincial-view">
            <h1 className="provincial-view--header">
                ??????????????? {numDistricts} ????????? {numCandidate} ??????
                <ToggleButton onClick={() => toggleShowDetail()}>
                    <i className="icon--chevron icon--chevron"></i>
                </ToggleButton>
            </h1>
            <div>
                <div className="provincial-view--content">
                    <PartyList byPartySorted={byPartySorted} partyChanged={partyChanged} />
                    <Overview waffleData={byPartySorted} view={'provinceView'} />
                </div>
            </div>
        </div>
    );
};

const SeePartyMenu = ({ partyView, view }) => {
    const color = partyView ? 'black' : 'white';
    const width = view === 'provinceView' ? '18px' : '26px';
    const height = view === 'provinceView' ? '13px' : '29px';
    const fontSize = view === 'provinceView' ? '1.8rem' : '3rem';
    const bottom = view === 'provinceView' ? '3px' : '5px';
    const style =
        view === 'provinceView'
            ? {
                marginRight: '5px',
                marginLeft: '10px',
                verticalAlign: 'middle'
            }
            : {
                marginRight: '16px',
                marginLeft: '10px',
                verticalAlign: 'middle'
            };
    return (
        <div
            className="toggle-container"
            style={{ fontSize: fontSize, bottom: bottom }}>
            <svg width={width} height={height} viewBox="0 0 18 13" style={style}>
                <title>Group 8</title>
                <desc>Created with Sketch.</desc>
                <g
                    id="Symbols"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd">
                    <g id="master/icon/white/party" fill={color}>
                        <g id="Group-8">
                            <circle id="Oval" cx="1.5" cy="1.5" r="1.5"></circle>
                            <circle id="Oval-Copy" cx="1.5" cy="6.5" r="1.5"></circle>
                            <circle id="Oval-Copy-2" cx="1.5" cy="11.5" r="1.5"></circle>
                            <rect id="Rectangle" x="4" y="0.5" width="14" height="2"></rect>
                            <rect
                                id="Rectangle-Copy-2"
                                x="4"
                                y="5.5"
                                width="14"
                                height="2"
                            ></rect>
                            <rect
                                id="Rectangle-Copy-3"
                                x="4"
                                y="10.5"
                                width="14"
                                height="2"
                            ></rect>
                        </g>
                    </g>
                </g>
            </svg>
            ??????????????????
        </div>
    );
};

const SeeWinnerMenu = ({ partyView, view }) => {
    const colorFill = partyView ? 'black' : 'white';
    const colorStroke = partyView ? 'white' : 'black';
    const width = view === 'provinceView' ? '17px' : '23px';
    const height = view === 'provinceView' ? '17px' : '23px';
    const fontSize = view === 'provinceView' ? '1.8rem' : '3rem';
    const bottom = view === 'provinceView' ? '3px' : '5px';
    const style =
        view === 'provinceView'
            ? {
                marginRight: '5px',
                marginLeft: '10px',
                verticalAlign: 'middle'
            }
            : {
                marginRight: '16px',
                marginLeft: '10px',
                verticalAlign: 'middle'
            };
    return (
        <div
            className="toggle-container"
            style={{
                fontSize: fontSize,
                bottom: bottom
            }}
        >
            <svg width={width} height={height} viewBox="0 0 17 17" style={style}>
                <g
                    id="Desktop-Design"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g
                        id="By-Province-Zoom"
                        transform="translate(-1202.000000, -267.000000)"
                        fill={colorFill}
                        stroke={colorStroke}
                    >
                        <g id="Group-11" transform="translate(1046.000000, 200.000000)">
                            <g id="Group-10" transform="translate(17.000000, 57.000000)">
                                <g
                                    id="master/icon/white/people"
                                    transform="translate(140.000000, 11.000000)"
                                >
                                    <g id="master/icon/people">
                                        <g id="Group-16" style={{ marginTop: '10px' }}>
                                            <path
                                                d="M9.32539434,6.66666667 C8.86522752,6.66666667 8.49134199,6.29421915 8.49134199,5.83405234 C8.49134199,5.37388553 8.86522752,5 9.32539434,5 C9.78556115,5 10.1580087,5.37388553 10.1580087,5.83405234 C10.1580087,6.29421915 9.78556115,6.66666667 9.32539434,6.66666667 L9.32539434,6.66666667 Z M5.99134199,6.66666667 C5.53157188,6.66666667 5.15800866,6.29421915 5.15800866,5.83405234 C5.15800866,5.37388553 5.53157188,5 5.99134199,5 C6.45111211,5 6.82467532,5.37388553 6.82467532,5.83405234 C6.82467532,6.29421915 6.45111211,6.66666667 5.99134199,6.66666667 L5.99134199,6.66666667 Z M15.1580087,6.42081088 L14.0546519,6.42081088 C13.5999508,2.7970144 10.9089934,0 7.65800866,0 C4.40830837,0 1.71735101,2.7970144 1.26264986,6.42081088 L0.158008658,6.42081088 L0.158008658,8.57786415 L1.26264986,8.57786415 C1.71735101,12.2029856 4.40830837,15 7.65800866,15 C10.9089934,15 13.5999508,12.2029856 14.0546519,8.57786415 L15.1580087,8.57786415 L15.1580087,6.42081088 Z"
                                                id="Fill-22-Copy"
                                            ></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            ?????? ???.???. ?????????
        </div>
    );
};

export { ProvincialLeft, ProvincialRight, SeePartyMenu, SeeWinnerMenu };
