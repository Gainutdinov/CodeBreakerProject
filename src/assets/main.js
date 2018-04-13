let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    //add functionality to guess function here

    if ( answer.value==="" || attempt.value==="" ) {
        setHiddenFields();
    }

    if (!validateInput(input.value)) {
        return false;
    }
    else {
        attempt.value = Number(attempt.value) + 1;
    }
    setMessage("Incorrect, try again.");

    if (getResults(input)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }
    else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }


}



//implement new functions here

// sets the answer variable equal to a randomly generated whole number between 0 and 9999.
function setHiddenFields() {
    attempt.value = 0;
    let randomNum = Math.floor(Math.random() * (10000-0)) + 0;
    if (randomNum.toString().length < 4) {
        let delta = 4 - randomNum.toString().length;
        answer.value = '0'.repeat(delta)+randomNum.toString();
    }
    else{
        answer.value = randomNum.toString();
    }

}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}


function validateInput(arg) {
    if (arg.length == 4) {
        return true;
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input) {
    let extralHTML = `<div class="row"><span class="col-md-6"> ${input.value} </span><div class="col-md-6">`;
    let index = 0;
    let correctNums = 0;
    for (let num of input.value) {
        if (answer.value[index] == num) {
            extralHTML += `<span class="glyphicon glyphicon-ok"></span>`;
            correctNums += 1;
        } 
        else if (answer.value.indexOf(num) > -1) {
            extralHTML += `<span class="glyphicon glyphicon-transfer"></span>`;
        } else {
            extralHTML += `<span class="glyphicon glyphicon-remove"></span>`;
        }
        index += 1;
    }
    document.getElementById('results').innerHTML += extralHTML;
    if (correctNums == answer.value.length) {
        return true;
    }
    else {
        return false;
    }
}

function showAnswer(won) {
    if (won) {
        document.getElementById('code').innerHTML = answer.value;
        document.getElementById('code').classList.add("success");
    } else {
        document.getElementById('code').innerHTML = answer.value;
        document.getElementById('code').classList.add("failure");
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}