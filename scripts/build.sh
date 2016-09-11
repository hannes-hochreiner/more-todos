if [ -d "bld" ]; then
  rm -r bld
fi

mkdir bld

# transform riot tags
riot src bld

# transform es2015 modules
babel --plugins transform-es2015-modules-systemjs src/repositoryPouchdb.js --out-file bld/repositoryPouchdb.js

# copy static resources
cp src/index.html bld
cp src/manifest.json bld
cp src/icon-2x.png bld
cp src/icon-3x.png bld
cp src/icon-4x.png bld

# copy external resoures
cp external/material.min.css bld
cp external/material.min.js bld

# copy resources from node modules
cp node_modules/riot/riot.min.js bld
cp node_modules/pouchdb/dist/pouchdb.min.js bld
cp node_modules/pubsub-js/src/pubsub.js bld
cp node_modules/systemjs/dist/system.js bld

# generate the service worker script
echo var currentCache = \"more-todos-`date --iso-8601=seconds`\"\; > bld/serviceWorker.js
cat src/serviceWorker.js >> bld/serviceWorker.js
