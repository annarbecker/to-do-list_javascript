/// <reference path="to-do-classes-interfaces.ts" />
/// <reference path="to-do-people.ts" />
/// <reference path="to-do-listing-functions.ts" />

var people = ToDoList.people;

var tasks = [];
tasks.push(new ToDoList.HomeTask("Do the dishes.", "High"));
tasks.push(new ToDoList.HomeTask("Buy chocolate.", "Low", people.diane));
tasks.push(new ToDoList.HomeTask("Wash the laundry.", "High"));
tasks.push(new ToDoList.HobbyTask("Practice origami."));
tasks.push(new ToDoList.HobbyTask("Bake a pie."));
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
var nextDay = new Date();
nextDay.setDate(today.getDate() + 2);

tasks.push(new ToDoList.WorkTask(today, "Update blog.", "High", people.diane));
tasks.push(new ToDoList.WorkTask(tomorrow, "Go to meeting.", "Medium", people.thor));
tasks.push(new ToDoList.WorkTask(tomorrow, "Save the world.", "High", people.thor));
tasks.push(new ToDoList.WorkTask(tomorrow, "Buy a new shirt.", "Low", people.thor));
tasks.push(new ToDoList.WorkTask(nextDay, "Clean ceiling.", "Low", people.loki));

$(document).ready(function() {
  for(var person in people) {
    $('#person').append("<option value='" + person + "'>" + people[person].name + "</option>");
  }

  $("#choosePerson").submit(function(e){
    $(".taskLists").hide();
    $("#tasksByPerson").show();
    e.preventDefault();
    var title: string = $("#person").val();
    $("#personList").empty();
    var theseTasks = ToDoList.describeTasksForPerson(people[title], tasks);
    $("#personName").text(people[title].name);
    for(var blah of theseTasks) {
      $('#personList').append('<li class="list-group-item"><h4 class="list-group-item-heading">' + blah + '</h4></li>');
    }
    $("#highest").click(function(e){
      e.preventDefault();
      var urgent: Task = ToDoList.getHighestPriorityTask(people[title], tasks);
      $("#urgent").html("Highest priority task for " + people[title].name + " is " + urgent.description + "!!!");
    });
  });

  $("#choosePriority").submit(function(e){
    $(".taskLists").hide();
    $("#tasksByPriority").show();
    e.preventDefault();
    var level: string = $("#priority").val();
    $("#priorityList").empty();
    var theseTasks = ToDoList.listTasksByPriority(level, tasks);
    for(var blah of theseTasks) {
      $('#priorityList').append('<li class="list-group-item"><h4 class="list-group-item-heading">' + blah.description + '</h4></li>');
    }
  });

  $('#selectCategory').submit(function(event) {
    event.preventDefault();
    $(".taskForms").hide();
    console.log(people);
    var category: string = $('#taskCategory').val();
    if (category === "Home") {
      $('#homeTask').show();
      $("#homeAssign").html('<option value="none"></option>');
      for(var person in people) {
        $('#homeAssign').append("<option value='" + person + "'>" + people[person].name + "</option>");
      }
    } else if (category === "Work") {
      $('#workTask').show();
      $("#workAssign").empty();
      for(var person in people) {
        $('#workAssign').append("<option value='" + person + "'>" + people[person].name + "</option>");
      }
    } else {
      $('#hobbyTask').show();
    }
  });

  $('#addHobbyTask').submit(function(event) {
    event.preventDefault();
    $(".taskLists").hide();
    $("#allHobbyTasks").show();
    var hobby: string = $('#hobbyName').val();
    $('#hobbyName').val('');
    $('#hobbyList').empty();
    tasks.push(new ToDoList.HobbyTask(hobby));
    var hobbies = ToDoList.listTasksInCategory(ToDoList.HobbyTask, tasks);
    console.log(hobbies);
    for(var thing of hobbies) {
      $('#hobbyList').append('<li class="list-group-item"><h4 class="list-group-item-heading">' + thing.description + '</h4><p class="list-group-item-text">Priority: ' + thing.priority + '</p></li>');
    }
  });

  $('#addHomeTask').submit(function(event) {
    event.preventDefault();
    $(".taskLists").hide();
    $("#allHomeTasks").show();
    var home: string = $('#homeName').val();
    var wait: string = $('#homePriority').val();
    var assignee: string = $('#homeAssign').val();

    $('#homeName').val('');
    $('#homeList').empty();
    if (assignee === "none") {
      tasks.push(new ToDoList.HomeTask(home, wait));
    } else {
      tasks.push(new ToDoList.HomeTask(home, wait, people[assignee]));
    }
    var homes = ToDoList.listTasksInCategory(ToDoList.HomeTask, tasks);
    console.log(homes);
    for(var thing of homes) {
      if(thing.assignedTo === undefined) {
        var name = '';
      } else {
        var name = thing.assignedTo.name;
      }
      $('#homeList').append('<li class="list-group-item"><h4 class="list-group-item-heading">' + thing.description + '</h4><p class="list-group-item-text">Priority: ' + thing.priority + '</p><p class="list-group-item-text">' + name + '</p></li>');
    }
  });

  $('#addWorkTask').submit(function(event) {
    event.preventDefault();
    $(".taskLists").hide();
    $("#allWorkTasks").show();
    var work: string = $('#workName').val();
    var wait: string = $('#workPriority').val();
    var assignee: string = $('#workAssign').val();
    var dueDate: string = $('#workDate').val();
    var due: Date = new Date(dueDate);
    $('#workName').val('');
    $('#workList').empty();
    $('#workDate').val('');
    tasks.push(new ToDoList.WorkTask(due, work, wait, people[assignee]));
    console.log(tasks);
    var works = ToDoList.listTasksInCategory(ToDoList.WorkTask, tasks);
    console.log(works);
    for(var thing of works) {

      $('#workList').append('<li class="list-group-item"><h4 class="list-group-item-heading">' + thing.description + '</h4><p class="list-group-item-text">Priority: ' + thing.priority + '</p><p class="list-group-item-text">Assigned To: ' + thing.assignedTo.name + '</p><p class="list-group-item-text">Due Date: ' + thing.dueDate.toDateString() + '</p></li>');
    }
  });
});
