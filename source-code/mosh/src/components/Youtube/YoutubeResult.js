import React, { useState, useEffect } from 'react';

const YoutubeResult= (params) => {

    const [result,setResult] = useState("");
    var userKey = 'AIzaSyBhklDEhDYrLwf5mMkLKsA34Btqjpj8S7k';
    //var playlistID = "PLzMXToX8Kzqggrhr-v0aWQA2g8pzWLBrR";
    //console.log(Object.values(params)[0]);
    //working playlist url
    //const URL = ` https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${userKey}&playlistId=${playlistID}`;
    //note cannot add new line within url
    //var InputTitle="DDU DDU"
    var titleQuery=`${Object.values(params)[0]} Official Music Video`;

    
    const options = {
        part:'snippet',
        key:userKey,
        regionCode:'AU',
        q:`${titleQuery}`,
        maxResults:1,
        $videoCategoryId:10,
    }
    const query = Object.keys(options).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(options[k])).join('&');
    //?part=snippet&key=${userKey}&regionCode=AU&q=music&maxResults='10'$videoCategoryId=10
    //working search url
    const URL = ' https://www.googleapis.com/youtube/v3/search?' + query;
    useEffect(() => {
        if (Object.values(params)[0] === "" || Object.values(params)[1] === "false"){
            //if nothing inputted in search or if not submitted (will be undefined if not)
            setResult("");
        } else {
            console.log(params)
            // GET request using fetch inside useEffect React hook
            fetch(URL)
            .then(response => response.json())
            .then(responseData => {
                if (responseData.items == null){
                    console.log(responseData)
                } else {
                    var title = (responseData.items).map(a => a.snippet.title);
                    //title is an array
                    
                    setResult(title[0])
                }
            })
            ;
        }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [URL,params]);
    return (
        <div className="search-params">
            {result.length === 0 ? (
				<div>Type in something and press submit to search for a song ;)</div>
			) : (result)}
        </div>
    );
};
export default YoutubeResult;