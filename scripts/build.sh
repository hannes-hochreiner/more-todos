if [ -d "bld" ]; then
  rm -r bld
fi

mkdir bld

riot --type babel src/todolist.tag bld/todolist.js
riot --type babel src/todo.tag bld/todo.js
cp src/index.html bld
cp src/manifest.json bld
cp src/icon-2x.png bld
cp src/icon-3x.png bld
cp src/icon-4x.png bld
cp node_modules/riot/riot.min.js bld
