import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <WHBanner/>
    );
  }
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

class HelpList extends Component {
    render() {
        return (
            <div hidden={ !this.props.helping}
                 className={"help slideIn"}>
                <div
                    style={{"cursor" : "pointer"
                        , "textAlign" : "right"
                        , "marginRight" : "18px"}}
                    onClick={() => this.props.helpCloseFn()}>
                    X
                </div>
                <ul style= {{"listStyle" : "none"
                    , "marginLeft" : "0"}}>

                    {this.props.helpItems.map( e =>
                        <li key={e}
                            style={{"padding" : "0"
                            , "margin" : "0 18px 9px 0"}}>{e}</li>)}
                </ul>
            </div>
        )
    }
}

// function appBanner () {
//     return div(
//         header(
//             div( {
//                     class: "about"
//                     , onclick: mx=> mx.onOff = !mx.onOff
//                     , title: "Usage hints, and credit where due."
//                     , content: cF( c=> c.md.onOff? "hide" : "Pro tips")
//                 }
//                 , {
//                     name: "appHelpToggle"
//                     , onOff: cI( false)
//                 })
//             , div( { class: "headermain"}
//                 , span( {class: "askhn"}, "Ask HN:")
//                 , span( {class: "who"}, "Who&rsquo;s Hiring?")))
//         , helpList(appHelpEntry,"appHelpToggle"))
// }
export default App;
