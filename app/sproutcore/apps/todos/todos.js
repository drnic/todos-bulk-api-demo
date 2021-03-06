Todos = SC.Application.create({
  store: SC.Store.create().from('BulkApi.BulkDataSource')
});

Todos.store.commitRecordsAutomatically = NO;

Todos.Todo = SC.Record.extend({
  title: SC.Record.attr(String),
  isDone: SC.Record.attr(Boolean, { defaultValue: NO, key: 'is_done' })
});
Todos.Todo.resourceName = 'todo';

Todos.CreateTodoView = SC.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');
 
    if (value) {
      Todos.todoListController.createTodo(value);
      this.set('value', '');
      Todos.store.commitRecords();
    }
  }
});

SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
  var todos = Todos.store.find(Todos.Todo);
  Todos.todoListController.set('content', todos);
});

Todos.todoListController = SC.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: [],

  // Creates a new todo with the passed title, then adds it
  // to the array.
  createTodo: function(title) {
    var record = Todos.store.createRecord(Todos.Todo, { title: title });
  },
  
  // Calculated property based on @each.isDone
  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),
  
  clearCompletedTodos: function() {
    this.filterProperty('isDone', true).forEach(function(item) {
      item.destroy();
    });
    Todos.store.commitRecords();
  },
  
  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);
      Todos.store.commitRecords();
      return value;
    } else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')
  
});

Todos.MarkDoneView = SC.Checkbox.extend({
  valueBinding: '.parentView.content.isDone',
  title: function() {
    return this.getPath('parentView.content.title') + 
            ' [' + this.getPath('parentView.content').statusString() + ']';
  }.property('.parentView.content.title', '.parentView.content.status').cacheable()
  
});

Todos.StatsView = SC.TemplateView.extend({
  remainingBinding: 'Todos.todoListController.remaining',
  
  displayRemaining: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining')
});
