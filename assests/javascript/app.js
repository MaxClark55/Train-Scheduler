var config = {
    apiKey: "AIzaSyB1l5sv_PA9Qrpc9epNScwZch--skqOAHM",
    authDomain: "choochootimes.firebaseapp.com",
    databaseURL: "https://choochootimes.firebaseio.com",
    projectId: "choochootimes",
    storageBucket: "",
    messagingSenderId: "537996100567"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var name = "";
var destination = "";
var time = "";
var frequency = "";


$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    name = $("#train").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val();
    console.log(name);


    database.ref().set({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
    });
});

// add a row to the rain table 
database.ref().on("child_added", function (childSnapshot) {
    var name = $("<td>").text(childSnapshot.val().name);
    var destination = $("<td>").text(childSnapshot.val().destination); 
    var frequency = $("<td>").text(childSnapshot.val().frequency); 
    console.log(childSnapshot.val().name)
  
// Math
    var trainStart = childSnapshot.val().time;
    var interval = childSnapshot.val().frequency;
    var trainStart = moment().diff(moment(trainStart, "hh:mm A"), 'm');
    var trainNext = trainStart % interval;
    var timeMinsAway = interval - trainNext;
    var timeNext = moment().add(timeMinsAway, 'm').toDate();
    var prettyTime = moment(timeNext).format("hh:mm A");
    var upcomingTrain = $("<td>").text(timeMinsAway);
    var time = $("<td>").text(prettyTime);


    var newButton = $("<button>")
        .addClass("btn")
        .addClass("btn-secondary")
        .addClass("removeTrain")
        .addClass(name)
        .attr("id", childSnapshot.val().destination)
        .text("x");
    var buttonCell = $("<td>").html(newButton)

    var newRow = $("<tr>");
    newRow.append(name)
        .append(destination)
        .append(time)
        .append(frequency)
        .append(upcomingTrain)
        .append(buttonCell);
    $("#trainTable").append(newRow)
});

$("body").on("click", ".removeTrain", function (e) {
    console.log(e);
    $(this).closest("tr").remove();
    var removeMe = e.target.id;
    console.log(removeMe);
    database.ref().child(removeMe).remove();
})
 