import {TodolistPresenter} from "../src/todolistPresenter";

/** @test {TodoListPresenter} */
describe("The task list presenter", () => {
  /** @test {TodoListPresenter.constructor} */
  it("should instantiate", (done) => {
    let pubsub = jasmine.createSpyObj("PubSub", ["subscribe"]);
    let tlp = new TodolistPresenter({}, pubsub);

    expect(tlp).toBeDefined();
    done();
  });

  /** @test {TodoListPresenter.init} */
  it("should initialize the view", (done) => {
    let repo = jasmine.createSpyObj("Repository", ["getAllTodos"]);
    let pubsub = jasmine.createSpyObj("PubSub", ["subscribe"]);
    let view = jasmine.createSpyObj("View", ["setTodos"]);
    let tlp = new TodolistPresenter(repo, pubsub);

    repo.getAllTodos.and.returnValue(new Promise((resolve, reject) => {
      resolve([
        {"title": "title1"},
        {"title": "title2"}
      ]);
    }));

    tlp.init(view).then(() => {
      expect(view.setTodos).toHaveBeenCalledWith([
        {"title": "title1"},
        {"title": "title2"}
      ]);
      done();
    });
  });

  /** @test {TodoListPresenter.createTodo} */
  it("should create new todos", (done) => {
    let repo = jasmine.createSpyObj("Repository", ["getAllTodos", "createTodo"]);
    let pubsub = jasmine.createSpyObj("PubSub", ["subscribe"]);
    let view = jasmine.createSpyObj("View", ["setTodos", "getNewTodoText"]);
    let tlp = new TodolistPresenter(repo, pubsub);

    repo.getAllTodos.and.returnValue(new Promise((resolve, reject) => {
      resolve([
        {"title": "title1"},
        {"title": "title2"}
      ]);
    }));

    view.getNewTodoText.and.returnValue("newTodoText");

    tlp.init(view).then(() => {
      return tlp.createTodo();
    }).then(() => {
      expect(view.getNewTodoText).toHaveBeenCalled();
      expect(repo.createTodo).toHaveBeenCalledWith({
        "text": "newTodoText",
        "completed": false
      });
      done();
    });
  });

  it("should listen for newly created todos", (done) => {
    let repo = jasmine.createSpyObj("Repository", ["getAllTodos"]);
    let pubsub = jasmine.createSpyObj("PubSub", ["subscribe"]);
    let view = jasmine.createSpyObj("View", ["setTodos"]);
    let todoCreatedHandler = null;

    pubsub.subscribe.and.callFake((topic, handler) => {
      if (topic === "todo.created") {
        todoCreatedHandler = handler;
      }
    });

    repo.getAllTodos.and.returnValue(new Promise((resolve, reject) => {
      resolve([
        {"title": "title1"},
        {"title": "title2"}
      ]);
    }));

    let tlp = new TodolistPresenter(repo, pubsub);

    tlp.init(view).then(() => {
      expect(view.setTodos).toHaveBeenCalledTimes(1);
      expect(repo.getAllTodos).toHaveBeenCalledTimes(1);

      return todoCreatedHandler("fakeId");
    }).then(() => {
      expect(view.setTodos).toHaveBeenCalledTimes(2);
      expect(repo.getAllTodos).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it("should listen for updated todos", (done) => {
    let repo = jasmine.createSpyObj("Repository", ["getAllTodos"]);
    let pubsub = jasmine.createSpyObj("PubSub", ["subscribe"]);
    let view = jasmine.createSpyObj("View", ["setTodos"]);
    let todoCreatedHandler = null;

    pubsub.subscribe.and.callFake((topic, handler) => {
      if (topic === "todo.updated") {
        todoCreatedHandler = handler;
      }
    });

    repo.getAllTodos.and.returnValue(new Promise((resolve, reject) => {
      resolve([
        {"title": "title1"},
        {"title": "title2"}
      ]);
    }));

    let tlp = new TodolistPresenter(repo, pubsub);

    tlp.init(view).then(() => {
      expect(view.setTodos).toHaveBeenCalledTimes(1);
      expect(repo.getAllTodos).toHaveBeenCalledTimes(1);

      return todoCreatedHandler("fakeId");
    }).then(() => {
      expect(view.setTodos).toHaveBeenCalledTimes(2);
      expect(repo.getAllTodos).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it("should listen for deleted todos", (done) => {
    let repo = jasmine.createSpyObj("Repository", ["getAllTodos"]);
    let pubsub = jasmine.createSpyObj("PubSub", ["subscribe"]);
    let view = jasmine.createSpyObj("View", ["setTodos"]);
    let todoCreatedHandler = null;

    pubsub.subscribe.and.callFake((topic, handler) => {
      if (topic === "todo.deleted") {
        todoCreatedHandler = handler;
      }
    });

    repo.getAllTodos.and.returnValue(new Promise((resolve, reject) => {
      resolve([
        {"title": "title1"},
        {"title": "title2"}
      ]);
    }));

    let tlp = new TodolistPresenter(repo, pubsub);

    tlp.init(view).then(() => {
      expect(view.setTodos).toHaveBeenCalledTimes(1);
      expect(repo.getAllTodos).toHaveBeenCalledTimes(1);

      return todoCreatedHandler("fakeId");
    }).then(() => {
      expect(view.setTodos).toHaveBeenCalledTimes(2);
      expect(repo.getAllTodos).toHaveBeenCalledTimes(2);
      done();
    });
  });
});
