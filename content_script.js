/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// inject script into window
function inject(code, src) {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    if (src) {
        script.setAttribute("src", browser.runtime.getURL(src));
    }
    script.innerText = code;
    document.body.appendChild(script);
}

function main(result) {
    let truefalseTasks = result.truefalseTasks || "none";
    let chooseTasks = result.chooseTasks || "none";
    let matchingTasks = result.matchingTasks || "none";
    let writeTasks = result.writeTasks || "none";

    inject(`
    let truefalseTasks = "${truefalseTasks}";
    let chooseTasks = "${chooseTasks}";
    let matchingTasks = "${matchingTasks}";
    let writeTasks = "${writeTasks}";
    `);

    inject(null, "/inject/inject.js");
}

function onError(error) {
    console.error(`Error: ${error}`);
}

let getting = browser.storage.sync.get();
getting.then(main, onError);
