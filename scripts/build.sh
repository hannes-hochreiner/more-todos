if [ -d "bld" ]; then
  rm -r bld
fi

mkdir bld

riot --type babel src/todolist.tag bld/todolist.js
riot --type babel src/todo.tag bld/todo.js
cp src/index.html bld
cp node_modules/riot/riot.min.js bld
inkscape --without-gui --export-png=bld/icon-2x.png --export-width=96 --export-height=96 art/icon.svg
inkscape --without-gui --export-png=bld/icon-3x.png --export-width=144 --export-height=144 art/icon.svg
inkscape --without-gui --export-png=bld/icon-4x.png --export-width=192 --export-height=192 art/icon.svg
