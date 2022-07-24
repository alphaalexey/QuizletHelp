/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        truefalseTasks: document.getElementById("truefalse_tasks").value,
        chooseTasks: document.getElementById("choose_tasks").value,
        matchingTasks: document.getElementById("matching_tasks").value,
        writeTasks: document.getElementById("write_tasks").value
    });

    // show snackbar
    let snackbar = document.getElementById("snackbar");
    snackbar.classList.add("show");
    setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}
  
function restoreOptions() {
    function setCurrentChoice(result) {
        document.getElementById("truefalse_tasks").value = result.truefalseTasks || "none";
        document.getElementById("choose_tasks").value = result.chooseTasks || "none";
        document.getElementById("matching_tasks").value = result.matchingTasks || "none";
        document.getElementById("write_tasks").value = result.writeTasks || "none";
    }
  
    function onError(error) {
        console.error(`Error: ${error}`);
    }
  
    let getting = browser.storage.sync.get();
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
