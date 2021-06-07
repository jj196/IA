// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

var numState = 0;
var pos = 0;
function test(states2){
    if(numState % 4 === 0 )
        pos +=1;
    console.log('pos', pos)
    var states = states2[pos]
    console.log('statet a', states)
    var location = states[0];		
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML+="<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    if (action_result == "CLEAN"){
      if (location == "A") states[1] = "CLEAN";
       else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";	
    numState += 1;
    states2[numState%4] = states;
    console.log('statet d', states)
 setTimeout(function(){ test(states2); }, 2000);
}

var states = [
    ["A","DIRTY","DIRTY"],
    ["B","DIRTY","DIRTY"],
    ["A","DIRTY","CLEAN"],
    ["B","CLEAN","DIRTY"],
    ["A","CLEAN","DIRTY"],
    ["B","DIRTY","CLEAN"],
    ["A","CLEAN","CLEAN"],
    ["B","CLEAN","CLEAN"]
]
;
 test(states); 
