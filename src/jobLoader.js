import React, { Component } from 'react';

const SEARCH_MO_IDX = 0;


// class WHBanner extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             appHelping: false
//         };
//     }
//     toggleAppHelp() {
//         this.setState({appHelping: !this.state.appHelping});
//     }
//     render() {
//         return (
//             <div>


class PickAMonth extends Component {
    render () {
        return (
            <div className="pickAMonth">
                <select className="searchMonth"
                        value="17205865"
                        onChange={()=> alert('load month')}>
                    {window.gMonthlies.map( (m, x) =>
                    <option value={m.hnId}
                            selected={x===SEARCH_MO_IDX}>
                        {m.desc}
                    </option>)}
                </select>
            </div>
        )}
}

// function pickAMonth() {
//     return div({class: "pickAMonth"}
//         , select({
//                 name: "searchMonth"
//                 , class: "searchMonth"
//                 , value: cI(gMonthlies[SEARCH_MO_IDX].hnId)
//                 , onchange: (mx, e) => {
//                     let pgr = mx.fmUp("progress")
//                     ast(pgr)
//                     pgr.value = 0
//                     pgr.maxN = 0
//                     pgr.seen = new Set()
//                     pgr.hidden = false
//                     mx.value = e.target.value
//                 }
//             }
//             // --- start with this if initial load is too slow----
//             // , option( {value: "none"
//             //         , selected: "selected"
//             //         , disabled: "disabled"}
//             //     , "Pick a month. Any month.")
//             , gMonthlies.map((m, x) => option({
//                     value: m.hnId
//                     , selected: x === SEARCH_MO_IDX ? "selected" : null
//                 }
//                 , m.desc)))
//
//         , div({style: hzFlexWrapCentered}
//             , viewOnHN(cF(c => `https://news.ycombinator.com/item?id=${c.md.fmUp("searchMonth").value}`)
//                 , {hidden: cF(c => !c.md.fmUp("searchMonth").value)})
//             , span({
//                 style: "color: #fcfcfc; margin: 0 12px 0 12px"
//                 , hidden: cF(c => !c.md.fmUp("searchMonth").value)
//                 , content: cF(c => {
//                     let pgr = c.md.fmUp("progress")
//                         , jobs = c.md.fmUp("jobLoader").jobs || [];
//                     return pgr.hidden ? "Total jobs: " + jobs.length
//                         : "Parsing: " + PARSE_CHUNK_SIZE * pgr.value
//                 })
//             })
//
//             , progress({
//                 max: cF(c => c.md.maxN + "")
//                 , hidden: cF(c => !c.md.fmUp("searchMonth").value)
//                 , value: cI(0)
//             }, {
//                 name: "progress"
//                 , maxN: cI(0)
//                 , seen: cI(new Set())
//             })
//         ))
// }

export default PickAMonth;