#!/bin/sh

build() {
    echo "Building chrome extension..."
    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    rm -rf dist/*

    react-scripts build
    mkdir dist/
    cp build/* dist/ -r
    
    mv dist/index.html dist/popup.html
}

build