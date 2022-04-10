
const party62 = partyname => {
    const logoes = {
        เพื่อไทย: 'PheuThai.png',
        ประชาธิปัตย์: 'Democrat.png',
        ชาติไทยพัฒนา: 'Chartthaipattana.png',
        ภูมิใจไทย: 'Bhumjaithai.png',
        ชาติพัฒนา: 'Chartpattana.png',
        เศรษฐกิจใหม่: 'NewEconomics.png',
        พลังประชารัฐ: 'Pracharat.png',
        อนาคตใหม่: 'Futureforward.png',
        รวมพลังประชาชาติไทย: 'Act.png',
        ประชาชาติ: 'Prachachat.png'
    }

    return logoes[partyname];
}

const partyLogo = electionYear => {
    const yearLogo = {
        'election-2562': party62
    };

    return partyName => yearLogo[electionYear](partyName) || 'purple';
}

export { party62 };
export default partyLogo;
