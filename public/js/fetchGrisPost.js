const elForm = document.getElementById('formGris');
const elGrisnamn = document.getElementById('grisNamn');
const elGrisSort = document.getElementById('grisSort');
const elGrisLand = document.getElementById('grisLand');
const elGrisPris = document.getElementById('grisPris');

function newPig(event) {
    event.preventDefault();
    let grisNamn = elGrisnamn.value;
    let grisSort = elGrisSort.value;
    let grisLand = elGrisLand.value;
    let grisPris = elGrisPris.value;


// Example POST method implementation:
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({grisNamn: grisNamn, grisSort: grisSort, grisLand: grisLand, grisPris: grisPris}) // body data type must match "Content-Type" header
        });
        return response.json();
    }

    postData('http://127.0.0.1:3030/pigs')
        .then((data) => {
            console.log(data);
        });

    document.getElementById("formGris").reset();

}

elForm.addEventListener('submit', newPig, false);
