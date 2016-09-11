import {RepositoryPouchdb as Repository} from "../src/repositoryPouchdb";

describe("The repository", () => {
  it("should instantiate", (done) => {
    let repo = new Repository();

    expect(repo).toBeDefined();
    done();
  });

  it("should provide a list of all documents", (done) => {
    let pouchDb = jasmine.createSpyObj("PouchDb", ["allDocs"]);

    pouchDb.allDocs.and.returnValue(new Promise((resolve, reject) => {
      resolve({
        "rows": [
          { "doc": { "text": "test1", "completed": false } },
          { "doc": { "text": "test2", "completed": false } }
        ]
      });
    }));

    let repo = new Repository(pouchDb);

    repo.getAllTodos().then((res) => {
      expect(res).toEqual([
        { "text": "test1", "completed": false },
        { "text": "test2", "completed": false }
      ]);
      expect(pouchDb.allDocs).toHaveBeenCalledWith({"include_docs": true});
      done();
    });
  });

  it("should provide a function to presist a new document", (done) => {
    let pouchDb = jasmine.createSpyObj("PouchDb", ["post"]);

    pouchDb.post.and.returnValue(new Promise((resolve, reject) => {
      resolve({ "id": "testId1" });
    }));

    let pubsub = jasmine.createSpyObj("PubSub", ["publish"]);
    let repo = new Repository(pouchDb, pubsub);

    repo.createTodo({ "text": "test" }).then(() => {
      expect(pouchDb.post).toHaveBeenCalledWith({"text": "test"});
      expect(pubsub.publish).toHaveBeenCalledWith("todo.created", "testId1");
      done();
    });
  });

  it("should provide a function to update an existing document", (done) => {
    let pouchDb = jasmine.createSpyObj("PouchDb", ["put"]);

    pouchDb.put.and.callFake((todo) => {
      return new Promise((resolve, reject) => {
        resolve(todo);
      });
    });

    let pubsub = jasmine.createSpyObj("PubSub", ["publish"]);
    let repo = new Repository(pouchDb, pubsub);

    repo.updateTodo({ "id": "testId2", "text": "testText" }).then(() => {
      expect(pouchDb.put).toHaveBeenCalledWith({ "id": "testId2", "text": "testText" });
      expect(pubsub.publish).toHaveBeenCalledWith("todo.updated", "testId2");
      done();
    });
  });

  it("should provide a function to delete an existing document", (done) => {
    let pouchDb = jasmine.createSpyObj("PouchDb", ["remove"]);

    pouchDb.remove.and.callFake((todo) => {
      return new Promise((resolve, reject) => {
        resolve(todo);
      });
    });

    let pubsub = jasmine.createSpyObj("PubSub", ["publish"]);
    let repo = new Repository(pouchDb, pubsub);

    repo.deleteTodo({ "id": "testId3", "text": "testText" }).then(() => {
      expect(pouchDb.remove).toHaveBeenCalledWith({ "id": "testId3", "text": "testText" });
      expect(pubsub.publish).toHaveBeenCalledWith("todo.deleted", "testId3");
      done();
    });
  });
});
