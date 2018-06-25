import React, { Component } from 'react';
import './App.css';
import HelpList from './SharedView'
import PickAMonth from './jobLoader'

class App extends Component {
  render() {
    return (
        <div>
            <WHBanner/>
            <div style={{
                "margin" : "0px"
                , "background" : "#ffb57d"}}>
                <PickAMonth/>
            </div>
        </div>

    );
  }
}

// function WhoIsHiring() {
//     return div(
//         appBanner()
//         , div( {style: "margin:0px; background:#ffb57d"}
//             , pickAMonth()
//             , jobListingLoader() // hidden iFrames where we load HN page for scraping
//             , controlPanel()
//             , jobList()))
// }

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
        this.state = {
            appHelping: false
        };
    }
    toggleAppHelp() {
        this.setState({appHelping: !this.state.appHelping});
    }
    render() {
        return (
            <div>
                <header>
                    <AppHelpToggle
                        helping={this.state.appHelping}
                        onClick={() => this.toggleAppHelp()}
                    />

                    <div className="headermain">
                        <span className="askhn">AskHN:</span>
                        <span className="who">Who&rsquo;s Hiring?</span>
                    </div>
                </header>
                <HelpList
                    helping={this.state.appHelping}
                    helpItems={appHelpEntry}
                    helpCloseFn={() => this.toggleAppHelp()}
                />
            </div>
        );
    }
}

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
