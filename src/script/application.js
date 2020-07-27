class API {
    async getApi(value) {
        try {
            const data = await fetch(value);
            const dataJSON = data.json();

            return dataJSON;
        } catch (err) {
            console.log(err)
        }
    }
}

class Show {
    constructor() {
        this.api = new API();
    }

    showFront(pageIndex, index) {
        const parent = document.querySelector('.bodyContainer .row');
        const loader = document.querySelector('.loader');
        const buttonAll = document.querySelector('.showDataAll');

        this.api.getApi(`http://www.omdbapi.com/?apikey=34a2066e&s=naruto&page=${pageIndex}`).then(response1 => {
            response1.Search.forEach((api1) => {
                this.api.getApi(`http://omdbapi.com/?apikey=34a2066e&i=${api1.imdbID}`).then(response2 => {
                    index++;
                    let data = this.dataFront(response2, index++);

                    parent.appendChild(data);

                    const button = document.querySelectorAll('.button');

                    button.forEach(buttonData => {
                        buttonData.addEventListener('click', function() {
                            $('.modal').modal();
                        })
                    })
                }).finally(
                    loader.style.display = 'none',
                    (index == 1) ? buttonAll.style.display = 'block' : buttonAll.style.display = 'none'
                )
            })
        })

        return this;
    }

    showBack(pageIndex,index) {
        const body = document.querySelector('body');

        this.api.getApi(`http://www.omdbapi.com/?apikey=34a2066e&s=naruto&page=${pageIndex}`).then(response1 => {
            response1.Search.forEach((api1) => {
                this.api.getApi(`http://omdbapi.com/?apikey=34a2066e&i=${api1.imdbID}`).then(response2 => {
                    let data = this.dataPoster(response2,index++);
                    body.appendChild(data);
                })
            })
        })
    }

    dataFront(response2, index) {
        const div = document.createElement('div');

        div.classList.add('col');
        div.classList.add('xl4');
        div.classList.add('m6');
        div.classList.add('s12');

        if(response2.Poster !== 'N/A') {
            div.innerHTML = `
                <div class="card">
                    <div class="card-image">
                            <img src="${response2.Poster}">
                        </div>
                    <div class="card-content">
                            <strong>${response2.Title}</strong>
                            <p>${response2.Year}</p>
                            <p>${response2.Genre}</p>
                    </div>
                    <div class="card-action center">
                            <a class="waves-effect waves-light btn modal-trigger button" href="#modal${response2.imdbID}">Show Details</a>
                    </div>
                </div>`;
        }

        return div;
    }

    dataPoster(response2, index) {
        const div = document.createElement('div');

        div.setAttribute('id',`modal${response2.imdbID}`);
        div.classList.add('modal');
        div.classList.add('modal-fixed-footer');

        if(response2.Poster !== 'N/A') {
            div.innerHTML = `
                <div class="modal-header">
                    <h5>Movie Details</h5>
                    <hr>
                </div>

                <div class="modal-content">
                    <div class="row">
                        <div class="col m4 s12 cardContentHeader">
                            <img src="${response2.Poster}" alt="">
                        </div>
                        <div class="col m8 s12">
                            <ul class="collection">
                                    <li class="collection-item"><h4>${response2.Title}</h4></li>
                                    <li class="collection-item"><b>Director : </b> ${response2.Director} </li>
                                    <li class="collection-item"><b>Duration : </b> ${response2.Runtime} </li>
                                    <li class="collection-item"><b>Languange : </b> ${response2.Language} </li>
                                    <li class="collection-item"><b>Actors : </b> ${response2.Actors} </li>
                                    <li class="collection-item"><b>Writer : </b> ${response2.Writer} </li>
                                    <li class="collection-item"><b>Plot : </b> ${response2.Plot} </li>
                                </ul>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Exit</a>
                </div>`;
        }

        return div;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    const buttonAll = document.querySelector('.showDataAll');
    new Show().showFront('1', 1);
    new Show().showBack('1');

    buttonAll.addEventListener('click', function() {
        new Show().showFront('2');
        new Show().showBack('2');
    })
})
