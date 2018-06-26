function clg(...args) {
    console.log(...args);
}

function buildMonth( monthid) {
    console.assert(monthid)
    return { monthid: monthid
        , loadTask: unProcessedMonth(monthid)
    }
}

function unProcessedMonth( monthid) {
    let urls = monthPageUrls( monthid);

    return {
        // todo try shorthand monthid
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

// --- utilities ---------------------------------------------------------


function monthPageUrls( monthid) {
    let moDef = getMonthlyDef( monthid);
    console.assert( moDef, "moPageUrls got undef mid", monthid)
    // files are numbered off-by-one to match the page param on HN
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

const SEARCH_MO_IDX = 0;
const moDef = window.gMonthlies[SEARCH_MO_IDX];

const startMonth = moDef? buildMonth(moDef.hnId) : {};

function monthReducer( state = startMonth, action) {
    switch (action.type) {
        case "CHANGE_MONTH":
            clg("chgmo sees", action);
            return buildMonth( action.monthid)

        default:
            return state
    }
}

export default monthReducer