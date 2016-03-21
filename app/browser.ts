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
});
