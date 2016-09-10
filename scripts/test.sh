#!/usr/bin/env bash
scripts/build.sh

if [ -d "bld_test" ]; then
  rm -r bld_test
fi

mkdir bld_test

babel src_test/repository.test.js --out-file bld_test/repository.test.js

nodeunit bld_test
