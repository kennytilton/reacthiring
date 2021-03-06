import React, { Component } from 'react';
import './App.css';
import HelpList from './SharedView'
import RdxMonthLoader from './MonthLoader'
import store from "./js/store/index";
import {togAppHelp} from "./js/actions/index"

import {connect} from 'react-redux';
import { Provider } from 'react-redux'

function clg(...args) {
    console.log(...args);
}

class App extends Component {


  render() {
      clg( "appbam", store.getState())

      store.subscribe(() => console.log('Look ma, Redux!!'))

      //store.dispatch( addArticle({ name: 'React Redux Tutorial for Beginners', id: 1 }) )

    return (
        <Provider store={store}>
            <div>
                <RdxBanner/>
                <RdxMonthLoader/>
                <ControlPanel/>
                <JobList/>
            </div>
        </Provider>

    );
  }
}

function ControlPanel( props) {
    return <p>CPanel RSN</p>
}

function JobList(props) {
    return <p>JobList RSN</p>
}


const appHelpEntry = [
    "Click any job header to show or hide the full listing."

    , "Once visible, double-click the job description to open the listing on HN in a new tab."

    , "All filters are ANDed except as you direct within RegExp fields."

    , "Your annotations are kept in local storage, so stick to one browser."

    ,"Works off page scrapes taken every couple of hours." +
    " E-mail <a href='mailto:kentilton@gmail.com'>Kenny</a> if they seem stopped."

    , "RFEs welcome and can be raised " +
    "<a href='https://github.com/kennytilton/whoshiring/issues'>here</a>. "

    , "Built with <a href='https://github.com/kennytilton/matrix/blob/master/js/matrix/readme.md'>" +
    "Matrix Inside</a>&trade;."

    , "This page is not affiliated with Hacker News, but..."

    , "..thanks to the HN crew for their assistance. All screw-ups remain " +
    "<a href='https://news.ycombinator.com/user?id=kennytilton'>kennytilton</a>'s."

    , "Graphic design by <a href='https://www.mloboscoart.com'>Michael Lobosco</a>."
]


class WHBanner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header>
                    <AppHelpToggle
                        helping={this.props.helping}
                        onClick={() => this.props.onHelpClick()}
                    />

                    <div className="headermain">
                        <span className="askhn">AskHN:</span>
                        <span className="who">Who&rsquo;s Hiring?</span>
                    </div>
                </header>
                <HelpList
                    helping={this.props.helping}
                    helpItems={appHelpEntry}
                    helpCloseFn={() => this.props.onHelpClick()}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        helping: state.app.helping
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHelpClick: () => {
            dispatch(togAppHelp())
        }
    }
}

const RdxBanner = connect(
    mapStateToProps,
    mapDispatchToProps
)(WHBanner)


class AppHelpToggle extends Component {
    render() {
        return (
            <div className="about"
                 onClick={() => this.props.onClick()}>
                {this.props.helping ? "hide help" : "Pro Tips"}
            </div>
        )
    }
}

export default App;
