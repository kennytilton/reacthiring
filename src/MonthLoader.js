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
        let moDef = gMos[SEARCH_MO_IDX]
        this.state = moDef? {
            monthid: moDef.hnId
            , loadTask: unProcessedMonth(moDef.hnId)
        } : {}
    }
    changeMonth(e) {
        console.assert( e.target.value, "changemo not seeing monthid")
        let monthid = e.target.value
            , loadTask = unProcessedMonth(monthid);
        console.assert(loadTask)

        this.setState({
            monthid: monthid
            , loadTask: loadTask
        })
    }
    render () {
        return <div style={{
            "margin" : "0px"
            , "background" : "#ffb57d"}}>
            <PickAMonth
                defmo={this.state.monthid}
                monthid={this.state.monthid}
                onChange={(e)=>this.changeMonth(e)}/>
            <MonthJobsLoader
                loadTask={ this.state.loadTask}/>
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

                <ViewOnHN
                    monthid={this.props.monthid}
                    altMsg="View monthly question on HN"/>
            </div>
        )}
}

function unProcessedMonth( monthid) {
    let urls = monthPageUrls( monthid);

    console.log("chya", urls)
    return {
        monthid: monthid
        , pageUrlsRemaining: urls
        // most of these properties support a progress bar if we get that far
        , pageUrlCount: urls.length // remember starting count
        , jobsSeen: new Set() // used to de-dupe across pages; it happens, and we can get dup entire pages
        , athings: [] // HN replies (job or not) are identified by class "aThing"
        , athingParseCount: 0
        , phase: "cullAthings"
    }
}

class MonthJobsLoader extends Component {
    render () {
        console.log("mojload props!", this.props)
        console.assert(this.props.loadTask)
        return (
            <div>
                {this.props.loadTask.pageUrlsRemaining[0] ?
                    <PageLoader loadTask={this.props.loadTask}/> : <span> "no mas pages"</span>}
            </div>
        )
    }
}

class PageLoader extends Component {
    render () {
        console.assert(this.props.loadTask.pageUrlsRemaining[0], "no url!")
        console.log("loading url", this.props.loadTask.pageUrlsRemaining[0])
        return (
            <iframe src={this.props.loadTask.pageUrlsRemaining[0]}
                    title="HN Page Scraper"
                    onLoad={()=> console.log("booya!",this.props.loadTask.pageUrlsRemaining[0])}/>
        )
    }
}

// (defn mk-page-loader []
// (fn [task]
// (assert (first (:page-urls-remaining task)))
// [:iframe {:src     (first (:page-urls-remaining task))
// :on-load #(let [rem-pages (rest (:page-urls-remaining task))]
//     (reset! month-load
//     (merge task {
//     :athings             (into (:athings task)
//         (job-page-athings (.-target %)))
//     :page-urls-remaining rem-pages
//     :phase               (if (empty? rem-pages)
//             :parse-jobs
//         (:phase task))})))}]))

// --- utilities ---------------------------------------------------------


function monthPageUrls( monthid) {
    let moDef = getMonthlyDef( monthid);
    console.assert( moDef, "moPageUrls got undef mid", monthid)
    // files are numbered off-by-one to match the page param on HN
    console.log("public????", process.env.PUBLIC_URL)
    return intRange( moDef.pgCount).map( pgOffset =>
         `${process.env.PUBLIC_URL}/hnpages/${monthid}/${pgOffset+1}.html`)
}

// {process.env.PUBLIC_URL + '/logo.png'}
function getMonthlyDef( monthid) {
    for (let mn = 0; mn < window.gMonthlies.length; ++mn) {
        if (window.gMonthlies[mn].hnId === monthid)
            return window.gMonthlies[mn];
    }
    console.assert(false, "gModef no find mid", monthid)
}

function intRange( start, end) {
    if (start === undefined) {
        return []
    } else if ( end === undefined) {
        return intRange( 0, start)
    } else {
        let r = []
        for (let n = start; n < end; ++n) {
            r.push(n)
        }
        return r
    }
}

export default MonthLoader;