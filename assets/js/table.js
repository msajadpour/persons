var persons = JSON.parse(localStorage.getItem("personsData"));
function showPersons() {
    if (persons !== null) {
        persons.map(person => {
            let personsNode = `  
          <tr id="${person.id}" class="deletePerson">
            <td scope="row">${person.id}</td>
            <td scope="row">${person.fname}</td>
            <td>${person.lname}</td>
            <td> ${person.age} ساله</td>
            <td>${person.skills.join(" - ")}</td>
            <td><button class="btn btn-danger">حذف</button></td>
          </tr> `;
            $("tbody").append(personsNode);
        });
    } 
}
showPersons();
function handleDeletePersons(id) {
  let clonePersons = [...persons];
  let filteredPersons = clonePersons.filter(p => p.id != id);
  localStorage.setItem("personsData", JSON.stringify(filteredPersons));
  persons = JSON.parse(localStorage.getItem("personsData"));
  $("tbody").empty();
  showPersons()
  watcherClasses()
}
function watcherClasses(){
  $(".deletePerson").on("click", function () {
      handleDeletePersons(this.id);
  });
}
$(".deletePerson").on("click", function () {
    handleDeletePersons(this.id);
});
