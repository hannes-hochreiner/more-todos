riot.tag2('mr-page-main', '<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header"> <header class="mdl-layout__header"> <div class="mdl-layout__header-row"> <span class="mdl-layout-title">more todos</span> <div class="mdl-layout-spacer"></div> <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon"> <i class="material-icons">more_vert</i> </button> <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="demo-menu-lower-right"> <li class="mdl-menu__item" onclick="{deleteCompleted}">delete completed</li> </ul> </div> </header> <div class="mdl-layout__drawer"> <span class="mdl-layout-title">Help</span> <nav class="mdl-navigation"> <a class="mdl-navigation__link" href="#about">about</a> </nav> </div> <main class="mdl-layout__content"> <div class="page-content"> <mr-todolist repository="{repo}" pubsub="{pubsub}"></mr-todolist> </div> </main> </div>', '', '', function(opts) {
    var that = this;

    that.repo = opts.repository;
    that.pubsub = opts.pubsub;

    that.on("updated", function() {
      that.upgradeRecursively(that.root);
    });

    that.upgradeRecursively = function(elem) {
      componentHandler.upgradeElement(elem);

      for (let childCntr = 0; childCntr < elem.children.length; childCntr++) {
        that.upgradeRecursively(elem.children[childCntr]);
      }
    };

    that.deleteCompleted = function() {
      that.repo.getAllTodos().then(function(res) {
        res.filter(function(elem) {
          return elem.completed;
        }).forEach(function(elem) {
          that.repo.deleteTodo(elem);
        });
      }).catch(function(err) {
        that.pubsub.publish("error.page-main.deleteCompleted", err);
      });
    };
});
