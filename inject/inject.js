/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// load answers dictionary
let answers = {};
window.Quizlet.assistantModeData.studiableDocumentData.studiableItems.forEach(study => {
    let cardSides = study.cardSides;
    let word = cardSides[0].media[0].plainText;
    let definition = cardSides[1].media[0].plainText;
    answers[definition] = word;
});

if (truefalseTasks !== "none") {
    // proccess all truefalse questions
    document.querySelectorAll("[id^='trueFalse-']").forEach(question => {
        let qbody = question.firstChild;

        let definition = qbody.firstChild.firstChild.lastChild.innerText;
        let word = qbody.lastChild.firstChild.lastChild.innerText;

        let answer = question.childNodes[2].childNodes[(answers[definition] != word) | 0];
        switch (truefalseTasks) {
            case "color":
                answer.style.color = "darkgreen";
                break;

            case "dot":
                answer.lastChild.data += ".";
        }
    });
}

if (chooseTasks !== "none") {
    // proccess all choose questions
    document.querySelectorAll("[id^='mcq-']").forEach(question => {
        let qbody = question.firstChild;

        let definition = qbody.firstChild.lastChild.innerText;
        let word = answers[definition];

        let answerNodes = qbody.childNodes[1].lastChild.childNodes;
        for (let i = 0; i < answerNodes.length; i++) {
            if (answerNodes[i].innerText === word) {
                let answer = answerNodes[i].lastChild.firstChild.firstChild;
                switch (chooseTasks) {
                    case "color":
                        answer.style.color = "darkgreen";
                        break;
        
                    case "dot":
                        answer.innerText += ".";
                }
                break;
            }
        }
    });
}

if (matchingTasks !== "none") {
    // proccess all matching tasks
    let matchingAnswers = [];
    document.querySelectorAll("[id^='matching-']").forEach(question => {
        let definition = question.previousSibling.innerText;
        let word = answers[definition];
        matchingAnswers.push(word);
    });
    if (matchingAnswers) {
        for (let i = 0; i < matchingAnswers.length; i++) {
            let answer = document.getElementById("matching-0").parentNode.nextSibling.childNodes[i].firstChild.firstChild.firstChild;
            if (matchingTasks === "numbers") {
                answer.innerText += ` ${matchingAnswers.indexOf(answer.innerText) + 1}`;
            }
        }
    }
}

if (writeTasks !== "none") {
    // proccess all write tasks
    document.querySelectorAll("[id^='written-']").forEach(question => {
        let qbody = question.firstChild;

        let definition = qbody.firstChild.firstChild.lastChild.innerText;
        let word = answers[definition];

        switch (writeTasks) {
            case "placeholder":
                qbody.querySelector("input").placeholder = word;
                break;

            case "fill":
                qbody.querySelector("input").value = word;
        }
    });
}
