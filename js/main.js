import { Hypothesis } from "./Hypothesis";

var currentHypothesisCode = 0;
var currentAnswer = -1.0;
var hypothesisMap = new Map();
hypothesisMap.put(101, new Hypothesis("Previously injured", "Were you injured or involved in an accident in the past 24 hours", -1.0));
hypothesisMap.put(102, new Hypothesis("Concioussness check", "Did you faint or fall unconciouss?", -1.0));
hypothesisMap.put(103, new Hypothesis("Cofusion check", "", -1.0));
hypothesisMap.put(104, new Hypothesis("Day check", "Do you remember what day of the week it is?", -1.0));
hypothesisMap.put(105, new Hypothesis("Meal check", "Do you remember what you ate last?", -1.0));
hypothesisMap.put(104, new Hypothesis("Day check", "Do you remember what day of the week it is?", -1.0));



function diagnosis() {
    if (currentHypothesisCode == 0) { // Rule 1
        setNextHypothesis(101);
    }
    if (currentHypothesisCode == 101) {
        if (currentAnswer == -1.0) { // Rule 2
            setNextHypothesis(103);
        } else if (currentAnswer == 1.0) { // Rule 3
            setNextHypothesis(102);
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