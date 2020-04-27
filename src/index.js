// challenge 1: on page load, render the list of dogs. each dog should be put in the table as a row
// challenge 2: clicking on a dog's edit button should populate the top form with that dog's current information
// challenge 3: on submit, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog's information

const dogsURL = `http://localhost:3000/dogs`
const dogsTable = document.querySelector('table.margin')
const dogForm = document.getElementById('dog-form')

fetch(dogsURL)
    .then(r => r.json())
    .then((dogs) => {
        dogs.forEach((dog) => {
            loadDog(dog)
            // submitDogInfo(dog)
        })

    })

function loadDog(dog) {
    let newRow = document.createElement('tr')
    dogsTable.append(newRow)

    let newNameCell = document.createElement('td')
    newNameCell.innerText = `${dog.name}`
    newRow.append(newNameCell)

    let newBreedCell = document.createElement('td')
    newBreedCell.innerText = `${dog.breed}`
    newRow.append(newBreedCell)

    let newSexCell = document.createElement('td')
    newSexCell.innerText = `${dog.sex}`
    newRow.append(newSexCell)

    let editButtonCell = document.createElement('button')
    editButtonCell.innerText = `Edit`
    editButtonCell.style.cursor = 'pointer'
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
function submitDogInfo() {
    dogForm.addEventListener("submit", (event) => {
        event.preventDefault()
    
        let dogId = event.target.dataset.id
        let dogName = event.target.name.value
        let dogBreed = event.target.breed.value 
        let dogSex = event.target.sex.value

        // console.log(`http://localhost:3000/dogs/${dog.id}`)
    
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                id: dogId,
                name: dogName,
                breed: dogBreed,
                sex: dogSex,
            })
            
            .then(r => r.json())
            .then((updatedDog) => {
                updatedDog.name = dogName
                updatedDog.breed = dogBreed
                updatedDog.sex = dogSex
            })
        })
    })
}
