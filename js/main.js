import { Hypothesis } from "./Hypothesis.js";

window.diagnosis= diagnosis;
window.onGreen = onGreen;
window.onYellow = onYellow;
window.onRed = onRed;

var currentHypothesisCode = 0;
var currentAnswer = -1.0;
var hypothesisMap = new Map();

hypothesisMap.set(101, new Hypothesis("Previously injured", "Were you injured or involved in an accident in the past 24 hours", null));
hypothesisMap.set(102, new Hypothesis("Conciousness check", "Did you faint or fall unconciouss?", null));
hypothesisMap.set(103, new Hypothesis("Day check", "Do you remember what day of the week it is?", null));
hypothesisMap.set(104, new Hypothesis("Meal check", "Do you remember what you ate last?", null));
hypothesisMap.set(105, new Hypothesis("Feel right", "Are you just not feeling right?", null));
hypothesisMap.set(106, new Hypothesis("Dizziness", "Are you feeling dizzy?", 0.7));
hypothesisMap.set(107, new Hypothesis("Clumsy", "Have you noticed yourself dropping things?", 0.6));
hypothesisMap.set(108, new Hypothesis("Gait check","Are you able to walk in a straight line?", 0.7));
hypothesisMap.set(109, new Hypothesis("Headache", "Are you sensing a pressue in your head or a headache?", 0.5));
hypothesisMap.set(110, new Hypothesis("Danger Check 1", "Are you experiencing repeated vomiting?", null));
hypothesisMap.set(111, new Hypothesis("Danger Check 2", "Are you experiencing slurred speech?", null));
hypothesisMap.set(112, new Hypothesis("Danger Check 3", "Are you experiencing a fever?", null));
hypothesisMap.set(113, new Hypothesis("Danger Check 4", "Are you experiencing drowsiness?", null));
hypothesisMap.set(114, new Hypothesis("Ringing ears", "Are you experiencing ringing in your ears?", 0.6));
hypothesisMap.set(115, new Hypothesis("Stimuli sensitivity", "Are you bothered by loud noises or bright lights?", 0.6))


function diagnosis() {
    switch (currentHypothesisCode) {
        case 101: {
            setBinary();
            if (currentAnswer == 1.0) {
                setNextHypothesis(102); // Rule 1 If injured check conciousness
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(103); // Rule 2 If not injured check if remembers day of the week and previous meal
            } else if (currentAnswer == 0.2) {
                setNextHypothesis(104); // Rule 3 If unsure whether injured check if remembers previous meal
            }
            break;
        }

        case 102: {
            if (currentAnswer == 1.0) {
                setNextHypothesis(110); // Rule 4 If was unconcious perfrom danger checks
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(103); // Rule 5 If not unconcious check if remembers day of the week
            }
            break;
        }

        case 103: {
            if (currentAnswer == 1.0) { 
                setNextHypothesis(104); // Rule 6 If remembers day of week perform meal check
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(110); // Rule 7 If does not remember day of week perform danger check   
            }
            break;
        }

        case 104: {
            if (currentAnswer == 1.0) { 
                setNextHypothesis(105); // Rule 8 If remembers previous meal perform feel right check
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(110); // Rule 9 If person does not remember meal perform danger check
            }
            break;
        }

        case 110: {
            if (currentAnswer == 1.0) {
                displayHighRisk(); // Rule 10 If person is experiencing repeated vomitting task is to display high risk screen
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(111); //Rule 11 If person is not experiencing vomitting check for slurred speech
            }
            break;
        }

        case 111: {
            if (currentAnswer == 1.0) {
                displayHighRisk(); // Rule 12 If person is experiencing slurred speech task is to display high risk screen
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(112); // Rule 13 If person is not experiencing vomitting check for fever
            }
            break;
        }

        case 112: {
            if (currentAnswer == 1.0) {
                displayHighRisk(); // Rule 14 If person is experiencing fever task is to display high risk screen
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(113); // Rule 15 If person is not experiencing fever check for drowsiness
            }
            break;
        }

        case 113: {
            if (currentAnswer == 1.0) {
                displayHighRisk(); // Rule 16 If person is experiencing drowsiness task is to display high risk screen
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(106); // Rule 17 If person is not experiencing drowsiness check for other symptoms
            }
            break;
        }

        case 105: {
            if (currentAnswer == 1.0) {
                setNextHypothesis(106); // Rule 18 If person is not feeling right perform symptoms check
            } else if (currentAnswer == -1.0) {
                displayLowRisk(); // Rule 19 If person feels fine then task is to display low risk screen
            }
            break;
        }

        case 106: {
            hypothesisMap.get(106).adjustCertainty(currentAnswer); // Rule 20 If person is dizzy then he might be concussed
            setNextHypothesis(107);
            break;
        }

        case 107: {
            hypothesisMap.get(107).adjustCertainty(currentAnswer); // Rule 21 If person is clumsy then he might be concussed
            setNextHypothesis(108);
            break;
        }

        case 108: {
            hypothesisMap.get(108).adjustCertainty(currentAnswer); // Rule 22 If person can't walk in a straight line then he might be concussed
            setNextHypothesis(109);
            break;
        }

        case 109: {
            hypothesisMap.get(109).adjustCertainty(currentAnswer); // Rule 23 If person has a headache then he might be concussed
            setNextHypothesis(114);
            break;
        }

        case 114: {
            hypothesisMap.get(114).adjustCertainty(currentAnswer);  // Rule 24 If person has ringing ears then he might be concussed
            setNextHypothesis(115);
            break;
        }

        case 115: {
            hypothesisMap.get(106).adjustCertainty(currentAnswer); // Rule 25 If person is sensitive to stimuli then he might be concussed
            break;
        }

        default: {
            setNextHypothesis(101);
        }
    }
}

function setNextHypothesis(code) {
    currentHypothesisCode = code;
    displayQuestion(hypothesisMap.get(code));
}

function displayQuestion(hypothesis) {
    document.getElementById("question").innerHTML = hypothesis.questionText;
}

function onGreen() {
    currentAnswer = 1.0;
    diagnosis();
}

function onRed() {
    currentAnswer = 1.0;
    diagnosis();
}

function onYellow() {
    currentAnswer = 0.2;
    diagnosis();
}

function setBinary() {
    document.getElementById("yellow").style.display = 'none';
}

function setTernary() {
    document.getElementById("yellow").style.display = 'block';
}

function displayHighRisk() {
    document.getElementById("question").innerHTML = "You are at a high risk of concussion, dial 911 immediately!";
    hideSelectionButtons();
}

function displayModerateRisk() {
    document.getElementById("question").innerHTML = "You are at a moderate risk of concussion, visiting a physician is recomended.";
    hideSelectionButtons();
}

function displayLowRisk() {
    document.getElementById("question").innerHTML = "You are at a low risk of concussion, visiting a physician recommended if symptoms last.";
    hideSelectionButtons();
}

function hideSelectionButtons() {
    document.getElementById("yellow").style.display = 'none';
    document.getElementById("red").style.display = 'none';
    document.getElementById("green").style.display = 'none';
}