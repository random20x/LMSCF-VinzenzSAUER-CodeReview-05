let sortByLikes = false;
let movieListContent = '';
let sequence = [];

function generateMovies() {
    movieListContent = '';
    $('#moviecards').replaceWith(`<div class="row text-center" id="moviecards"></div>`);
    if (sortByLikes == true) {
        sequence = [];
        moviedata.movies.sort(function(a, b) { return b.likes - a.likes });
        for (let sortThrough in moviedata.movies) {
            sequence.push(moviedata.movies[sortThrough].id);
        }
    } else if (sortByLikes == false) {
        sequence = [];
        moviedata.movies.sort(function(c, d) { return c.id - d.id });
        for (let sortBy in moviedata.movies) {
            sequence.push(moviedata.movies[sortBy].id);
        }
    };
    for (let tempID in sequence) {
        movieListContent += `
        <div class="card text-white m-4 p-1 col-lg-5 col-md-5 col-sm-4 bg-dark">
            <div class="row no-gutters">
                <div class="col-lg-3 col-md-4 col-sm-12">
                    <img src="${moviedata.movies[tempID].image}" class="card-img" alt="${moviedata.movies[tempID].name}" data-toggle="modal" data-target="#modal${moviedata.movies[tempID].id}">
                </div>
                <div class="col-lg-9 col-md-8 col-sm-12">
                    <div class="card-body text-left">
                        <h5 class="card-title" data-toggle="modal" data-target="#modal${moviedata.movies[tempID].id}">${moviedata.movies[tempID].name}</h5>
                        <p class="card-text text-truncate" data-toggle="modal" data-target="#modal${moviedata.movies[tempID].id}"><small>${moviedata.movies[tempID].info}</small></p>
                    </div>
                    <div class="card-footer">
                        <h4 class="card-text text-right text-success likeMe" id="${tempID}"><small>Like&nbsp;<i class="fa fa-thumbs-up"></i></small>&nbsp;&nbsp;<span class="badge badge-success rounded-circle">${moviedata.movies[tempID].likes}</span></h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal${moviedata.movies[tempID].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content bg-secondary text-white">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${moviedata.movies[tempID].name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p><img src="${moviedata.movies[tempID].image}" class="img-fluid close" data-dismiss="modal" alt="${moviedata.movies[tempID].name}"></p>
                        <h3>${moviedata.movies[tempID].name}</h3>
                        <p>${moviedata.movies[tempID].info}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    };
    $('#moviecards').replaceWith(`<div class="row text-center" id="moviecards">${movieListContent}</div>`);
    setEventListeners();
};


function setEventListeners() {
    $('.likeMe').click(function() {
        moviedata.movies[this.id].likes++;
        generateMovies();
    });
};

$('#sortLikesAscending').click(function() {
    sortByLikes = true;
    generateMovies();
    $('#sortStatus').replaceWith(`<div id="sortStatus"><small>Sorted by likes</small></div>`);
});

$('#doNotSort').click(function() {
    sortByLikes = false;
    generateMovies();
    $('#sortStatus').replaceWith(`<div id="sortStatus"><small>Unsorted</small></div>`);
});