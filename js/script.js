function searchMovie()
{
    $('#movie-list').html('')

    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '209777ca',
            's': $('#search-input').val()
        },

        success: function(result) {
            if (result.Response == 'True') {
                    let movies = result.Search

                    $.each(movies,  function(i, data) {
                        $('#movie-list').append(`
                            <div class="col-md-4">
                                <div class="card mb-3" style="width: 18rem;">
                                    <img src=`+ data.Poster +` class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year +`</h6>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`" >See details</a>
                                </div>
                                </div>
                            </div>
                        `)
                    })

                    $('#search-input').val('')
            } else {
                $('#movie-list').html(`
                <div class="row">
                <h1 class="text-center">` + result.Error + `</h1>
                </div>

                `)
            }
        }
    })
}

$('#search-button').on('click', function () {
    searchMovie()
})

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie()
    }
})

$('#movie-list').on('click', '.see-detail', function() {

    $.ajax({
        url: 'https://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '209777ca',
            'i': $(this).data('id')
        },

        success: function(movie) {
            if(movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src=`+ movie.Poster +` class="img-fluid" >
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <h6>Title</h6><p>`+ movie.Title +`</p>
                                    <h6>Genre</h6><p>`+ movie.Genre +`</p>
                                    <h6>Synopsis</h6><p>`+ movie.Plot +`</p>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)

            }
        }
    })

})
