import React, { Component } from 'react';

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

export default HelpList;