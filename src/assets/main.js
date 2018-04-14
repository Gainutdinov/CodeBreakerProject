let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');

    //add functionality to guess function here

    if (answer.value === "" || attempt.value === "") {
        setHiddenFields();
    }

    if (!validateInput(input.value)) {
        return false;
    } else {
        attempt.value = Number(attempt.value) + 1;
    }
    setMessage("Incorrect, try again.");

    if (getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }


}



//implement new functions here

// sets the answer variable equal to a randomly generated whole number between 0 and 9999.
function setHiddenFields() {
    attempt.value = 0;
    let randomNum = Math.floor(Math.random() * (10000 - 0)) + 0;
    if (randomNum.toString().length < 4) {
        let delta = 4 - randomNum.toString().length;
        answer.value = '0'.repeat(delta) + randomNum.toString();
    } else {
        answer.value = randomNum.toString();
    }

}

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}


function validateInput(arg) {
    if (arg.length == 4) {
        return true;
    } else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(input) {
    let correct = 0;
    let html = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    for(i = 0; i < input.length; i++)
    {
        if(input.charAt(i) == answer.value.charAt(i))
        {
            html += '<span class="glyphicon glyphicon-ok"></span>';
            correct++;
        } else if (answer.value.indexOf(input.charAt(i)) > -1) {
            html += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            html += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    html += '</div></div>';
    document.getElementById('results').innerHTML += html;
    if(correct == input.length) {
        return true;
    } else {
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