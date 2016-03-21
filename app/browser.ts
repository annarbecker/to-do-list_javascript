/// <reference path="to-do-classes-interfaces.ts" />
/// <reference path="to-do-people.ts" />
/// <reference path="to-do-listing-functions.ts" />

var people = ToDoList.people;

var tasks = [];

$(document).ready(function() {
  $('#selectCategory').submit(function(event) {
    event.preventDefault();
    $(".taskForms").hide();
    console.log(people);
    var category: string = $('#taskCategory').val();
    if (category === "Home") {
      $('#homeTask').show();
      for(var person in people) {
        $('#homeAssign').append("<option value='" + person + "'>" + people[person].name + "</option>");
      }
    } else if (category === "Work") {
      $('#workTask').show();
      for(var person in people) {
        $('#workAssign').append("<option value='" + person + "'>" + people[person].name + "</option>");
      }
    } else {
      $('#hobbyTask').show();
    }
  });

  $('#addHobbyTask').submit(function(event) {
    event.preventDefault();
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
});
