/// <reference path="to-do-classes-interfaces.ts" />
module ToDoList {
  export var describeTasksForPerson = function(assignee: IPerson, taskCollection: Task[]): String[] {
    var descriptions: String[] = [];
    for(var task of taskCollection){
      if(task.assignedTo === assignee) {
        descriptions.push(task.description);
      }
    }
    return descriptions;
  }

  export var listTasksInCategory = function(category: typeof ToDoList.Task, taskCollection: Task[]): Task[] {
    var selectedTasks: Task[] = [];
    for(var task of taskCollection) {
      if(task instanceof category) {
        selectedTasks.push(task);
      }
    }

    return selectedTasks;
  }

  export var listTasksByPriority = function(taskPriority: string, taskCollection: Task[]): Task[] {
    var selectedTasks: Task[] = [];
    for(var task of taskCollection) {
      if(task.priority === taskPriority) {
        selectedTasks.push(task);
      }
    }
    return selectedTasks;
  }

  export var getHighestPriorityTask = function(assignee: IPerson, taskCollection: Task[]): Task {
    for(var task of taskCollection){
      if(task.priority === "High" && task.assignedTo === assignee) {
        return task;
      }
    }
    for(var task of taskCollection){
      if(task.priority === "Medium" && task.assignedTo === assignee) {
        return task;
      }
    }
    for(var task of taskCollection){
      if(task.priority === "Low" && task.assignedTo === assignee) {
        return task;
      }
    }
  }
}
