import React, { Component } from 'react';
import {ViewOnHN} from "./SharedView";
import {connect} from 'react-redux';
import {changeMo} from "./js/actions/month"


class MonthLoader extends Component {
    constructor(props) {
        super(props);
        this.taskUpdater = this.taskUpdater.bind(this);
    }

    taskUpdater( updatedTask) {
        console.log("updtask!!! new", updatedTask.athings.length
            , "old", this.state.loadTask.athings.length)
        this.setState( Object.assign( this.state
        , { loadTask: updatedTask}))
    }
    render() {
        return <div style={{
            "margin" : "0px"
            , "background" : "#ffb57d"}}>
            <PickAMonth
                defmo={this.props.monthid}
                monthid={this.props.monthid}
                monthDefs={this.props.monthDefs}
                onChange={(e)=>this.props.changeMonth(e.target.value)}/>
            {/*<MonthJobsLoader*/}
                {/*loadTask={ this.state.loadTask}*/}
                {/*taskUpdater={ this.taskUpdater }/>*/}
        </div>
    }
}

const mapStateToProps = state => {
    // todo: can I just return state.month?

    return {
        monthid: state.month.monthid
        , loadTask: state.month.loadTask
        , monthDefs: state.app.monthDefs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeMonth: (mid) => {
            dispatch(changeMo(mid))
        }
    }
}

const RdxMonthLoader = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthLoader)

class PickAMonth extends Component {
    render () {
        return (
            <div className="pickAMonth">
                <select className="searchMonth"
                        defaultValue={ this.props.defmo}
                        onChange={(e)=>this.props.onChange(e)}>
                    {this.props.monthDefs.map( (m, x) =>
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

class MonthJobsLoader extends Component {
    render () {
        return (
            <div>
                {this.props.loadTask.pageUrlsRemaining[0] ?
                    <PageLoader
                        loadTask={this.props.loadTask}
                        taskUpdater={ this.props.taskUpdater }
                    /> : <span> "no mas pages"</span>}
            </div>
        )
    }
}

class PageLoader extends Component {
    render () {
        return (
            <iframe src={this.props.loadTask.pageUrlsRemaining[0]}
                    title="HN Page Scraper"
                    onLoad={(e)=>
                        this.props.taskUpdater(scrapeAthings( e.target, this.props.loadTask))}/>
        )
    }
}

function scrapeAthings( iframe, loadTask) {
    let pageRem = loadTask.pageUrlsRemaining.slice(1);
    console.log("scrape sees rem", pageRem.length);
    return Object.assign(loadTask,
        {
            athings: loadTask.athings.concat(jobPageAthings(iframe))
            , pageUrlsRemaining: pageRem
            , phase: pageRem > 0 ? loadTask.phase : "parse-jobs"
        })
}
const PARSE_CHUNK_SIZE = 30;

function jobPageAthings( iframe) {
    let hnBody = iframe.contentDocument.getElementsByTagName('body')[0];
    console.assert(hnBody);
    let all = Array.prototype.slice.call(hnBody.querySelectorAll('.athing'));
    console.log("page has athings=", all.length);
    return all.slice( PARSE_CHUNK_SIZE);
}



export default RdxMonthLoader;