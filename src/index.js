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
            turnDogIntoRow(dog)
        })
    })

function turnDogIntoRow(dog) {
    let dogRow = document.createElement('tr')
    dogRow.classList.add('dog-row')

    let dogRowName = document.createElement('td')
    dogRowName.id = 'dog-name'
    dogRowName.innerText = dog.name

    let dogRowBreed = document.createElement('td')
    dogRowBreed.id = 'dog-breed'
    dogRowBreed.innerText = dog.breed

    let dogRowSex = document.createElement('td')
    dogRowSex.id = 'dog-sex'
    dogRowSex.innerText = dog.sex

    let editButton = document.createElement('button')
    editButton.style.cursor = 'pointer'
    editButton.innerText = "Edit"    

    dogsTable.append(dogRow)
    dogRow.append(dogRowName, dogRowBreed, dogRowSex, editButton)

    editButton.addEventListener("click", (event) => {
        populateInputFields(dog)
    })
}

function populateInputFields(dog) {
    const dogRow = dogsTable.querySelector('.dog-row')
    const dogRowName = dogRow.querySelector('#dog-name')
    const dogRowBreed = dogRow.querySelector('#dog-breed')
    const dogRowSex = dogRow.querySelector('#dog-sex')
    
    const inputDogName = dogForm.name
    const inputDogBreed = dogForm.breed
    const inputDogSex = dogForm.sex

    inputDogName.value = dog.name
    inputDogBreed.value = dog.breed
    inputDogSex.value = dog.sex

    dogForm.addEventListener("submit", (event) => {
        event.preventDefault(),
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: inputDogName.value,
                breed: inputDogBreed.value,
                sex: inputDogSex.value,
            }),
        })
            .then(r => r.json())
            .then((dog) => {
                dogRowName.innerText = dog.name
                dogRowBreed.innerText = dog.breed
                dogRowSex.innerText = dog.sex
                dogForm.reset()
            })
    })
}