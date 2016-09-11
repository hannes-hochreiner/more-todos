import {RepositoryPouchdb as Repository} from "../bld/repositoryPouchdb";

class PouchFake {
  constructor() {
    this._functionCalls = [];
  }

  get functionCalls() {
    return this._functionCalls;
  }

  allDocs(opts) {
    this._functionCalls.push("allDocs: " + JSON.stringify(opts));

    return new Promise((resolve, reject) => {
      resolve({
        "rows": [
          { "doc": { "text": "test1", "completed": false } },
          { "doc": { "text": "test2", "completed": false } }
        ]
      });
    });
  }

  post(todo) {
    this._functionCalls.push("post: " + JSON.stringify(todo));

    return new Promise((resolve, reject) => {
      resolve({ "id": "testId1" });
    });
  }

  put(todo) {
    this._functionCalls.push("put: " + JSON.stringify(todo));

    return new Promise((resolve, reject) => {
      resolve(todo);
    });
  }

  remove(todo) {
    this._functionCalls.push("remove: " + JSON.stringify(todo));

    return new Promise((resolve, reject) => {
      resolve(todo);
    });
  }
}

class PubSubFake {
  constructor() {
    this._functionCalls = [];
  }

  get functionCalls() {
    return this._functionCalls;
  }

  publish(channel, data) {
    this._functionCalls.push("publish: " + channel + " " + JSON.stringify(data));
  }
}

export function construction(test) {
  test.expect(1);

  let repo = new Repository();

  test.notStrictEqual(typeof repo, "undefined");
  test.done();
}

export function getAllTodos(test) {
  test.expect(2);

  let pouchFake = new PouchFake();
  let repo = new Repository(pouchFake, new PubSubFake());

  repo.getAllTodos().then((res) => {
    test.deepEqual(res, [
      { "text": "test1", "completed": false },
      { "text": "test2", "completed": false }
    ]);
    test.deepEqual(pouchFake.functionCalls, ["allDocs: {\"include_docs\":true}"]);
    test.done();
  });
}

export function createTodo(test) {
  test.expect(2);

  let pouchFake = new PouchFake();
  let pubSubFake = new PubSubFake();
  let repo = new Repository(pouchFake, pubSubFake);

  repo.createTodo({ "text": "test" }).then(() => {
    test.deepEqual(pouchFake.functionCalls, ["post: {\"text\":\"test\"}"]);
    test.deepEqual(pubSubFake.functionCalls, ["publish: todo.created \"testId1\""]);
    test.done();
  });
}

export function updateTodo(test) {
  test.expect(2);

  let pouchFake = new PouchFake();
  let pubSubFake = new PubSubFake();
  let repo = new Repository(pouchFake, pubSubFake);

  repo.updateTodo({ "id": "testId2", "text": "testText" }).then(() => {
    test.deepEqual(pouchFake.functionCalls, ["put: {\"id\":\"testId2\",\"text\":\"testText\"}"]);
    test.deepEqual(pubSubFake.functionCalls, ["publish: todo.updated \"testId2\""]);
    test.done();
  });
}

export function deleteTodo(test) {
  test.expect(2);

  let pouchFake = new PouchFake();
  let pubSubFake = new PubSubFake();
  let repo = new Repository(pouchFake, pubSubFake);

  repo.deleteTodo({ "id": "testId3", "text": "testText" }).then(() => {
    test.deepEqual(pouchFake.functionCalls, ["remove: {\"id\":\"testId3\",\"text\":\"testText\"}"]);
    test.deepEqual(pubSubFake.functionCalls, ["publish: todo.deleted \"testId3\""]);
    test.done();
  });
}
