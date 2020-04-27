document.addEventListener('DOMContentLoaded', () => {
    let tBody = document.querySelector('tbody#table-body')
    fetch ("http://localhost:3000/dogs").then(r => r.json())
        .then((dogsArray) => {
            dogsArray.forEach ((dog) => {
                makeDogIntoHtml(dog)
            })
        })

    function makeDogIntoHtml (dog) {
        let tRow = document.createElement("tr")
        tRow.innerHTML = `<tr><td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button id="edit-button">Edit</button></td></tr>`
        tBody.append(tRow)

        let editButton = tRow.querySelector("#edit-button")
        editButton.addEventListener("click", (evt) => {
            let dogForm = document.querySelector("#dog-form")
            dogForm.innerHTML = `<input type="text" name="name" placeholder="dog's name" value="${dog.name}" />
            <input type="text" name="breed" placeholder="dog's breed" value="${dog.breed}" />
            <input type="text" name="sex" placeholder="dog's sex" value="${dog.sex}" />
            <input type="submit" value="Submit" />`

            dogForm.addEventListener("submit", (evt) => {
                evt.preventDefault()
                let dogFormName = evt.target.name.value
                let dogFormBreed = evt.target.breed.value
                let dogFormSex = evt.target.sex.value
                fetch(`http://localhost:3000/dogs/${dog.id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json", Accept: "application/json"},
                    body: JSON.stringify({
                        name: dogFormName,
                        breed: dogFormBreed,
                        sex: dogFormSex
                    })
                }).then(r => r.json()).then((updatedDog) => {
                    dog = updatedDog
                    tRow.innerHTML = `<tr><td>${updatedDog.name}</td><td>${updatedDog.breed}</td><td>${updatedDog.sex}</td><td><button id="edit-button">Edit</button></td></tr>`
                    dogForm.reset()
                })
            })
        })
    }

    

















})