var persons = JSON.parse(localStorage.getItem("personsData"))
console.log(persons)
persons.map((person , index)=>{
    let personsNode = `  
    <tr>
      <th scope="row">${index+1}</th>
      <th scope="row">${person.fname}</th>
      <td>${person.lname}</td>
      <td>${person.date}</td>
      <td>${person.skills.join(" - ")}</td>
    </tr> `         
    $("tbody").append(personsNode)
})
