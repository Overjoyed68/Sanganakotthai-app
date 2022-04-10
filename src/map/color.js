const party62 = partyname => {
    const colors = {
        // เพื่อไทย: '#da3731',
        // ประชาธิปัตย์: '#06aff3',
        // ชาติไทยพัฒนา: '#ff72a8',
        // ภูมิใจไทย: '#209fa0',
        // ชาติพัฒนา: '#ffaf41',
        // เศรษฐกิจใหม่: '#6e2fff',
        // พลังประชารัฐ: '#1f6fff',
        // อนาคตใหม่: '#ef7824',
        // รวมพลังประชาชาติไทย: '#303d8e',
        // ประชาชาติ: '#a35f26',
        // อื่นๆ: 'black'
        เพื่อไทย: '#00AA4E',
        ประชาธิปัตย์: '#51ffa1',
        ชาติไทยพัฒนา: '#68ffad',
        ภูมิใจไทย: '#c5ffe0',
        ชาติพัฒนา: '#00ae50',
        เศรษฐกิจใหม่: '#00c55a',
        พลังประชารัฐ: '#23ff88',
        อนาคตใหม่: '#00f370',
        รวมพลังประชาชาติไทย: '#006830',
        ประชาชาติ: '#00803b',
        อื่นๆ: '#fff'
    };
    return colors[partyname];
};

const partyColor = electionYear => {
    const yearColor = {
        'election-2562': party62
    };

    return partyName => yearColor[electionYear](partyName) || 'purple';
};

/**
 * Return fill defintions for selected year
 * @param {*} electionYear
 * @param {string} size Pattern size. normal|small
 * @param {str} uid make pattern id unique
 * @return {function} Fill defintion resolver. See below.
 */
export const partyFill = (electionYear, size = 'normal', uid = '') => {
    const yearColor = {
        'election-2562': party62
    };

    /**
     * Return fill definitions for selected year and party
     * @param {*} partyName
     * @param {*} partyWinnerCount How many seats this party earned for this zone
     * @param {*} quotaCount How many winner quota for this zone
     * @return {string} type Fill type. (fill|pattern)
     * @return {string} fill Fill string
     * @return {function} createPattern A function used to add pattern definitions
     */
    return (partyName, partyWinnerCount = 1, quotaCount = 1) => {
        const partyColor = yearColor[electionYear](partyName) || 'purple';
        // Dots paint when winning party doesn't earn all seats in this zone
        if (partyWinnerCount < quotaCount) {
            const patternId = `fill--${uid}--${partyName}--${partyWinnerCount}-${quotaCount}`;
            // control pattern styles
            const patternSize = size === 'small' ? 5 : 10;
            const zoneStyle = size === 'small'
                ?
                {
                    '1-3': { rect: '#ffffff', circle: 'party', r: 1.5 },
                    '1-2': { rect: 'party', circle: '#ffffff', r: 1.8 },
                    '2-3': { rect: 'party', circle: '#ffffff', r: 1.0 }
                }
                :
                {
                    '1-3': { rect: '#ffffff', circle: 'party', r: 3.0 },
                    '1-2': { rect: 'party', circle: '#ffffff', r: 3.6 },
                    '2-3': { rect: 'party', circle: '#ffffff', r: 2.0 }
                };
            return {
                id: patternId,
                type: 'pattern',
                fill: `url(#${patternId})`,
                createPattern: $defs => {
                    $defs.selectAll(`#${patternId}`).remove();
                    const style = zoneStyle[`${partyWinnerCount}-${quotaCount}`];
                    const $pattern = $defs.append('pattern');
                    // Create pattern
                    $pattern
                        .attr('id', patternId)
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', patternSize)
                        .attr('height', patternSize)
                        .attr('patternUnits', 'userSpaceOnUse')
                        .attr('patternTransform', `rotate(45)`);
                    // Base fill
                    $pattern
                        .append('rect')
                        .attr('x', 0)
                        .attr('y', 0)
                        .attr('width', patternSize)
                        .attr('height', patternSize)
                        .style('stroke', 'none')
                        .style('fill', style.rect === 'party' ? partyColor : style.rect);
                    // Paint polka dots
                    $pattern
                        .append('circle')
                        .attr('cx', patternSize / 2)
                        .attr('cy', patternSize / 2)
                        .attr('r', style.r)
                        .style('stroke', 'none')
                        .style(
                            'fill',
                            style.circle === 'party' ? partyColor : style.circle
                        );
                }
            };
        }
        return {
            type: 'color',
            fill: partyColor
        };
    };
};

export { party62 };
export default partyColor;
