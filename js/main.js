import { Hypothesis } from "./Hypothesis";

var currentHypothesisCode = 0;
var currentAnswer = -1.0;
var hypothesisMap = new Map();

hypothesisMap.put(101, new Hypothesis("Previously injured", "Were you injured or involved in an accident in the past 24 hours", -1.0));
hypothesisMap.put(102, new Hypothesis("Conciousness check", "Did you faint or fall unconciouss?", -1.0));
hypothesisMap.put(103, new Hypothesis("Day check", "Do you remember what day of the week it is?", -1.0));
hypothesisMap.put(104, new Hypothesis("Meal check", "Do you remember what you ate last?", -1.0));
hypothesisMap.put(105, new Hypothesis("Feel right", "Are you just not feeling right?", -1.0));
hypothesisMap.put(106, new Hypothesis("Dizziness", "Are you feeling dizzy", 0.3));
hypothesisMap.put(107, new Hypothesis("Clumsy", "Have you noticed yourself dropping things?", 0.3));
hypothesisMap.put(109, new Hypothesis("Gait check","Are you able to walk in a straight line?", 0.3));
hypothesisMap.put(109, new Hypothesis("Headache", "Are you sensing a pressue in your head or a headache?", 0.2));
hypothesisMap.put(110, new Hypothesis("Danger Check 1", "Are you experiencing repeated vomiting?", -1.0));
hypothesisMap.put(111, new Hypothesis("Danger Check 2", "Are you experiencing slurred speech?", -1.0));
hypothesisMap.put(110, new Hypothesis("Danger Check 3", "Are you experiencing a fever?", -1.0));


function diagnosis() {
    switch (currentHypothesisCode) {
        case 101: {
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
                // Rule 4 If was unconcious perfrom danger checks
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(103); // Rule 5 If not unconcious check if remembers day of the week
            }
            break;
        }

        case 103: {
            if (currentAnswer == 1.0) { 
                setNextHypothesis(104); // Rule 6 If remembers day of week do meal check
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(); // Rule 7 If does not remember day of week perform danger check
                
            }
            break;
        }

        case 104: {
            if (currentAnswer == 1.0) { 
                setNextHypothesis(105); // Rule 8 If remembers previous meal do feel right check
            } else if (currentAnswer == -1.0) {
                setNextHypothesis(); // Rule 9 If person does not remember meal perform danger check
            }
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

function displayQuestion() {

}

function setBinary() {
    document.getElementById("yellow").style.display = 'none';
}

function setTernary() {
    document.getElementById("yellow").style.display = 'block';
}