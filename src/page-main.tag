<mr-page-main>
  <div class="mdl-layout mdl-js-layout">
    <header class="mdl-layout__header mdl-layout__header--scroll">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">more todos</span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="#">all</a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Help</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="#about">about</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <mr-todolist repository={repo} pubsub={pubsub}></mr-todolist>
      </div>
    </main>
  </div>
  <script>
    this.repo = opts.repository;
    this.pubsub = opts.pubsub;

    this.on("updated", function() {
      this.upgradeRecursively(this.root);
    });

    this.upgradeRecursively = function(elem) {
      componentHandler.upgradeElement(elem);

      for (let childCntr = 0; childCntr < elem.children.length; childCntr++) {
        this.upgradeRecursively(elem.children[childCntr]);
      }
    };
  </script>
</mr-page-main>
