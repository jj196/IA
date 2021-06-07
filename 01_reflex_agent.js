// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states) {
    for (i in states) {
        var state = states[i] 
        var location = state[0];
        var state = state[0] == "A" ? state[1] : state[2];
        var action_result = reflex_agent(location, state);
        document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
        if (action_result == "CLEAN") {
            if (location == "A") state[1] = "CLEAN";
            else if (location == "B") state[2] = "CLEAN";
        }
        else if (action_result == "RIGHT") state[0] = "B";
        else if (action_result == "LEFT") state[0] = "A";
    }

    setTimeout(function () { test(states); }, 2000);
}

var states = [
    ["A", "DIRTY", "DIRTY"],
    ["B", "DIRTY", "DIRTY"],
    ["A", "DIRTY", "CLEAN"],
    ["B", "CLEAN", "DIRTY"],
    ["A", "CLEAN", "DIRTY"],
    ["B", "DIRTY", "CLEAN"],
    ["A", "CLEAN", "CLEAN"],
    ["B", "CLEAN", "CLEAN"]
];
test(states);
