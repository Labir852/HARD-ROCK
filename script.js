// SEARCH BUTTON EVENT HANDLER

const buttonSearch = document.getElementById("button-Search");

buttonSearch.addEventListener('click',function(){
    let inputVal = document.getElementById("searchbar").value;
    fetch("https://api.lyrics.ovh/suggest/"+inputVal)
    .then(res => res.json())
    .then(response => {
        let songs = response.data;
        let songHtml = "";
        songs.forEach(song => {
            songHtml += `
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name" id="title">${song.title}</h3>
                    <p class="author lead">Album by <span id="artist-name">${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="GetLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>
            `;
        });
        document.getElementById("search-result").innerHTML = songHtml;
        document.getElementById("Lyrics-Header").innerHTML = "";
        document.getElementById("Lyrics").innerText = "";
    })
})

// GET LYRICS FUNCTION

function GetLyrics(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>
        {
            
            document.getElementById("Lyrics-Header").innerHTML = 
            `<h2>${title}</h2>
            <h4><span>by </span>${artist}
            
            </h4>`;
            document.getElementById("Lyrics").innerText = data.lyrics;
        })
}




