function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('pigs');
const url = 'http://127.0.0.1:3030/pigs/';

fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        let pigs = data.pigs;
        return pigs.map(function (pigs) {
            let li = createNode('li');
            li.innerHTML = "Namn: " + pigs.grisNamn + ", " + "Sort: " + pigs.grisSort + ", " + "Land: " + pigs.grisLand + ", " + "Pris: " + pigs.grisPris;
            append(ul, li);
        })
    })
    .catch(function (error) {
        console.log(error);
    });