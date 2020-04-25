let dogTable = document.querySelector("#table-body")
let dogEditForm = document.querySelector('#dog-form') 

fetch('http://localhost:3000/dogs')
    .then(r => r.json())
    .then((dogArray) => {
        dogArray.forEach((dog) => {makeDogRow(dog)})
    });

function makeDogRow(dog) {
    let newDogRow = document.createElement('tr');
    newDogRow.className = 'padding';

    let dogName = document.createElement('td');
    dogName.className = 'padding center';
    dogName.innerText = dog.name;

    let dogBreed = document.createElement('td');
    dogBreed.className = 'padding center';
    dogBreed.innerText = dog.breed;

    let dogGender = document.createElement('td');
    dogGender.className = 'padding center';
    dogGender.innerText = dog.sex;

    let dogEdit = document.createElement('td');
    dogEdit.className = 'padding center';
    let dogEditBtn = document.createElement('button');
    dogEditBtn.innerText = 'EDIT';
    dogEdit.append(dogEditBtn);

    newDogRow.append(dogName, dogBreed, dogGender, dogEdit);
    dogTable.append(newDogRow);

    dogEditBtn.addEventListener("click", () => {
        [...dogEditForm.elements].forEach((element) => { 
            if (element.value !== "Submit") {
                element.value = dog[element.name]
            }
        })
        dogEditForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            let dogForm = evt.target
            let editName = dogForm.name.value
            let editBreed = dogForm.breed.value
            let editGender = dogForm.sex.value

            fetch(`http://localhost:3000/dogs/${dog.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: editName,
                    breed: editBreed,
                    sex: editGender
                })
            })
                .then(r => r.json())
                .then((dog) => {
                    dogName.innerText = dog.name;
                    dogBreed.innerText = dog.breed;
                    dogGender.innerText = dog.sex;
                    [...dogEditForm.elements].forEach((element) => { 
                        if (element.value !== "Submit") {element.value = ""}
                    })
                })
        })
    })
}