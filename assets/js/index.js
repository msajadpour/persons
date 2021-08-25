var savedPersons = JSON.parse(localStorage.getItem("personsData"));
var persons;
savedPersons !== null ? (persons = savedPersons) : (persons = []);
var dataToCheckEmpty = [];
var skillList = [];
var isRepetetive = false;
var personsAge ;

// onsubmit form
$("#submitPerson").on("click", function () {
    validation(); //validate form
});
//handle skills badge and validation them
$("#addSkill").on("click", function () {
    let skill = $("#skill").val().trim();
    if (skill !== "") {
        if (skillList.length > 0) {
            for (let i = 0; i < skillList.length; i++) {
                if (skillList[i] === skill) {
                    isRepetetive = true;
                    isValid(false, "#skill");
                }
            }
            if (isRepetetive) {
                isRepetetive = false;
            } else {
                skillList.push(skill);
                isValid(true, "#skill");
            }
        } else {
            skillList.push(skill);
        }
        isValid(true, "#skill");
    } else {
        isValid(false, "#skill");
    }
    showSkills();
    $("#skill").val("");
});
$("#showPersons").on("click", function () {
    document.getElementById("redirect").click();
});
$("#date").on("blur" , function(){
    ageCalculator()
})
function setData() {
    let fname = $("#fname").val();
    let lname = $("#lname").val();
    let skills = skillList;
    let age = personsAge
    let id = `${persons.length + 1}`
    person = {
        fname,
        lname,
        age,
        skills,
        id
    };
    skillsValidation();
    if (dataToCheckEmpty.includes("") || skillList.length == 0) {
        // to check non of inputs is empty and skill list is not empty
    } else {
        // data.skills = skillList
        persons.push(person);
        localStorage.setItem("personsData", JSON.stringify(persons));
        dataCleaner();
    }
}
function validation() {
    var formsTag = $(".input");
    // empty to dbl chek
    dataToCheckEmpty = [];
    for (let i = 0; i < formsTag.length; i++) {
        dataToCheckEmpty.push(formsTag[i].value.trim());
        // get value of each input and push to "data" array
        if (formsTag[i].value.trim() === "") {
            // to check wich input is empty
            formsTag[i].classList.add("is-invalid");
            formsTag[i].classList.remove("is-valid");
        } else {
            formsTag[i].classList.remove("is-invalid");
            formsTag[i].classList.add("is-valid");
        }
    }
    setData();
}
function skillsValidation(status) {
    if (status === "none") {
        $("#skill").removeClass("is-valid");
    } else {
        if (skillList.length == 0) {
            // check skill list is empty or not
            isValid(false, "#skill");
        } else {
            isValid(true, "#skill");
        }
    }
}
function showSkills() {
    // show array of skills
    $(".showSkills").html("");
    for (let i = 0; i < skillList.length; i++) {
        let skillNode = `<button type="button" id="${i}" class="btn btn-secondary disabled me-2 col-md-2 col-3">${skillList[i]}</button>`;
        $(".showSkills").append(skillNode);
    }
}
function isValid(status, id) {
    if (status) {
        $(id).addClass("is-valid");
        $(id).removeClass("is-invalid");
    } else {
        $(id).removeClass("is-valid");
        $(id).addClass("is-invalid");
    }
}
function dataCleaner() {
    let node = $(".input");
    for (let i = 0; i < node.length; i++) {
        node[i].value = "";
        node[i].classList.remove("is-valid");
    }
    skillList = [];
    skillsValidation("none");
    showSkills();
}
function ageCalculator() {
    var date = document.getElementById('date').value;
    var current = +new Date(date);
    personsAge = Math.floor(((Date.now() - current) / (31557600000)));
}