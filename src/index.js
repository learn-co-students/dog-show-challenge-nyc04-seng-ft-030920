let tableBody = document.getElementById("table-body")
let form = document.getElementById("dog-form")


fetch("http://localhost:3000/dogs")
.then(r => r.json())
.then(dogResponse => {
    dogResponse.forEach(element => {
        renderDog(element)
    });
})




function renderDog(dog){
  
    let tr = document.createElement("tr")
    let tdName = document.createElement("td")
    let tdBreed = document.createElement("td")
    let tdSex = document.createElement("td")
    let tdButton = document.createElement("td")

    let button = document.createElement("button")
    button.innerText = "Edit Dog"
    button.classList.add("edit")
    tdButton.append(button)

    tdName.innerText = dog.name
    tdBreed.innerText = dog.breed
    tdSex.innerText = dog.sex 

    tr.append(tdName , tdBreed , tdSex , tdButton)
    tableBody.append(tr)
     
    let tableButton = tdButton.querySelector(".edit")

    tableButton.addEventListener("click" , function(event){
        console.log(tableBody)
      let form = document.getElementById('dog-form')
      form["name"].placeholder = dog.name
      form["breed"].placeholder = dog.breed
      form["sex"].placeholder = dog.sex
      let postLink = dog.id

    

   console.log(form)
    form.addEventListener('submit' , function(event){
     
        event.preventDefault()
       
       let nameVal = event.target["name"].value
       let breedVal = event.target["breed"].value
       let sexVal  = event.target["sex"].value
       
        fetch(`http://localhost:3000/dogs/${postLink}`, {

           method: "PATCH",
           headers: {
               "Content-Type":"application/json",
               "Accept": "application/json"
           }, 

           body: JSON.stringify({
            name: nameVal,
            breed: breedVal,
            sex: sexVal
             
           })





        }).then(r => r.json())
        .then(dogEdit  => {
           dog.name = dogEdit.name,
           dog.breed = dogEdit.breed,
           dog.sex = dogEdit.sex 
        })
  
        fetch("http://localhost:3000/dogs")
        .then(r => r.json())
        .then(dogResponse => {
        dogResponse.forEach(element => {
        renderDog(element)
    });
})

    })
  })

}