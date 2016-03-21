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
});
