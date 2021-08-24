var data = [];
var formsTag = $(".input");
$("#submitPerson").on("click", function () { //click for submit form
    validation(); //validate form
    if(skillList.length == 0 ){ // check skill list is empty or not
        isValid(false , "#skill")
    }else{
        isValid(true , "#skill")
    }
});

function validation() {
    data = []; // empty to dbl chek
    for (let i = 0; i < formsTag.length; i++) {
        data.push(formsTag[i].value); // get value of each input and push to "data" array
        if (formsTag[i].value == "") {
            // to check wich input is empty
            formsTag[i].classList.add("is-invalid");
            formsTag[i].classList.remove("is-valid");
        } else {
            formsTag[i].classList.remove("is-invalid");
            formsTag[i].classList.add("is-valid");
        }
    }
    if (data.includes("") || skillList.length == 0) {// to check non of inputs is empty and skill list is not empty
        
    } else {
        data.push(skillList)
        console.log(data);
    }

}


var skillList = [];
var isRepetetive = false;
$("#addSkill").on("click", function () { //handle skills badge and validation them
    let skill = $("#skill").val();
    if (skill !== "") {
        if (skillList.length > 0) {
            for (let i = 0; i < skillList.length; i++) {
                if (skillList[i] === skill) {
                    isRepetetive = true;
                    isValid(false , "#skill");
                }
            }
            if (isRepetetive) {
                isRepetetive = false;
            } else {
                skillList.push(skill);
                isValid(true , "#skill");
            }
        } else {
            skillList.push(skill);
        }
        isValid(true ,"#skill");
    } else {
        isValid(false ,"#skill");
    }
    showSkills();
    $("#skill").val("");
});

function showSkills() { // show array of skills
    $(".showSkills").html("");
    for (let i = 0; i < skillList.length; i++) {
        let skillNode = `<button type="button" id="${i}" class="btn btn-secondary disabled me-2 col-md-2 col-3">${skillList[i]}</button>`;
        $(".showSkills").append(skillNode);
    }
}

function isValid(status , id) {
    if (status) {
        $(id).addClass("is-valid");
        $(id).removeClass("is-invalid");
    } else {
        $(id).removeClass("is-valid");
        $(id).addClass("is-invalid");
    }
}
