import React, { Component } from 'react';
import {ViewOnHN} from "./SharedView";

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

const gMos = window.gMonthlies;

class MonthLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthid: gMos[SEARCH_MO_IDX].hnId
        };
    }
    changeMonth(e) {
        this.setState({monthid: e.target.value})
    }
    render () {
        return <div style={{
            "margin" : "0px"
            , "background" : "#ffb57d"}}>
            <PickAMonth
                defmo={this.state.monthid}
                monthid={this.state.monthid}
                onChange={(e)=>this.changeMonth(e)}/>
            <JobLoader  monthid={this.state.monthid}/>
        </div>
    }
}

class PickAMonth extends Component {
    render () {
        return (
            <div className="pickAMonth">
                <select className="searchMonth"
                        defaultValue={ this.props.defmo}
                        onChange={(e)=>this.props.onChange(e)}>
                    {gMos.map( (m, x) =>
                        <option key={m.hnId}
                                value={m.hnId}>
                            {m.desc}
                        </option>)}
                </select>

                <ViewOnHN monthid={this.props.monthid}/>
            </div>
        )}
}
class JobLoader extends Component {
    render () {
        return <h3>job loader {this.props.monthid}</h3>
    }
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

export default MonthLoader;