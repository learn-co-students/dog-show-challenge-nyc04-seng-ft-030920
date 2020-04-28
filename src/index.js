const tableBody = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")
let dogId = 0
let selectedRow;

fetch(`http://localhost:3000/dogs`)
    .then(response => response.json())
    .then((dogsArray) => {
        dogsArray.forEach((singleDog) => {
            createHTMLForDog(singleDog)
        })
    })

let createHTMLForDog = (dog) => {
    
    // create the outer box

    let dogTr = document.createElement("tr")
    
    // fill in contents

    dogTr.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id="edit-btn">Edit</button></td>`

    // slap it to the DOM

    tableBody.append(dogTr)

    // find the elements
    let editDog = dogTr.querySelector("#edit-btn")

    // add listener

    editDog.addEventListener("click", (evt) => {
        dogId = dog.id
        selectedRow = dogTr
        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed
        dogForm.sex.value = dog.sex
    })
}

dogForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let dogName = evt.target.name.value
    let dogBreed = evt.target.breed.value
    let dogSex = evt.target.sex.value

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: dogName,
            breed: dogBreed,
            sex: dogSex
        }),
    })
        .then((response) => response.json())
        .then((dog) => {
            selectedRow.innerHTML = `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id="edit-btn">Edit</button></td>`
        })

})


document.addEventListener('DOMContentLoaded', () => {
})