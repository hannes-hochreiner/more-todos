if [ -d "bld" ]; then
  rm -r bld
fi

mkdir bld

riot --type babel src/todolist.tag bld/todolist.js
riot --type babel src/todo.tag bld/todo.js
babel src/repositoryPouchdb.js --out-file bld/repositoryPouchdb.js
cp src/index.html bld
cp src/manifest.json bld
cp src/icon-2x.png bld
cp src/icon-3x.png bld
cp src/icon-4x.png bld
cp external/material.min.css bld
cp external/material.min.js bld
cp node_modules/riot/riot.min.js bld
cp node_modules/pouchdb/dist/pouchdb.min.js bld
cp node_modules/pubsub-js/src/pubsub.js bld
cp src/serviceWorker.js bld
