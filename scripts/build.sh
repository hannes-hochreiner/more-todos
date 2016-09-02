if [ -d "bld" ]; then
  rm -r bld
fi

mkdir bld

riot --type babel src/todolist.tag bld/todolist.js
riot --type babel src/todo.tag bld/todo.js
cp src/index.html bld
cp src/manifest.json bld
cp src/icon-{2,3,4}x.png bld
cp node_modules/riot/riot.min.js bld
