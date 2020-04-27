// challenge 1: on page load, render the list of dogs. each dog should be put in the table as a row
// challenge 2: clicking on a dog's edit button should populate the top form with that dog's current information
// challenge 3: on submit, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog's information

const dogsURL = `http://localhost:3000/dogs`
const dogsTable = document.querySelector('table.margin')
const dogForm = document.getElementById('dog-form')

fetch(dogsURL)
    .then(r => r.json())
    .then((dogsArray) => {
        dogsArray.forEach((dog) => {
            turnDogIntoTableRow(dog)
        })
    })

function turnDogIntoTableRow(dog) {
    formatDogRow(dog)
    updateDog(dog)
}

function formatDogRow(dog) {
    let newRow = document.createElement('tr')
    let newNameCell = document.createElement('td')
    newNameCell.innerText = `${dog.name}`

    let newBreedCell = document.createElement('td')
    newBreedCell.innerText = `${dog.breed}`
    
    let newSexCell = document.createElement('td')
    newSexCell.innerText = `${dog.sex}`
    
    let editButtonCell = document.createElement('button')
    editButtonCell.innerText = `Edit`
    editButtonCell.style.cursor = 'pointer'

    dogsTable.append(newRow)
    newRow.append(newNameCell)
    newRow.append(newBreedCell)
    newRow.append(newSexCell)
    newRow.append(editButtonCell)

    // click event listener
    editButtonCell.addEventListener("click", () => {
        const nameInput = dogForm.querySelector(`input[name = 'name']`)
        const breedInput = dogForm.querySelector(`input[name = 'breed']`)
        const sexInput = dogForm.querySelector(`input[name = 'sex']`)

        dogForm.dataset.id = dog.id
        nameInput.value = dog.name
        breedInput.value = dog.breed
        sexInput.value = dog.sex
    })
}

// submit event listener
function updateDog(dog) {
    dogForm.addEventListener("submit", (event) => {
        submitListener(dog)
    })
}

function submitListener(dog) {
    event.preventDefault()

    let newDogName = event.target.name.value
    let newDogBreed = event.target.breed.value 
    let newDogSex = event.target.sex.value

    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newDogName,
            breed: newDogBreed,
            sex: newDogSex,
        })
    })
        .then(r => r.json())
        .then((updatedDog) => {
            console.log(updatedDog)
        })
}