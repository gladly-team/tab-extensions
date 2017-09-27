#!/usr/bin/env bash
# Create two Firefox builds with different configurations,
# one for the Mozilla addons store and the other to self-host
# to enable downloads from a web page.

# Clear intermediate builds.
mkdir -p ./intermediate-builds
rm -rf ./intermediate-builds/firefox/
mkdir -p ./intermediate-builds/firefox/

# Make addon store intermediate build.
ADDON_STORE_BUILD_PATH=./intermediate-builds/firefox/addon-store
echo "Building intermediate extension for the addon store at $ADDON_STORE_BUILD_PATH."
cp -r ./src/firefox $ADDON_STORE_BUILD_PATH
mv $ADDON_STORE_BUILD_PATH/tmp/manifest.addon-store.json $ADDON_STORE_BUILD_PATH/manifest.json
rm $ADDON_STORE_BUILD_PATH/manifest.addon-store-overrides.json
rm $ADDON_STORE_BUILD_PATH/manifest.self-hosted-overrides.json
# rm -rf $ADDON_STORE_BUILD_PATH/tmp/

# Make self-hosted intermediate build.
SELF_HOSTED_BUILD_PATH=./intermediate-builds/firefox/self-hosted
echo "Building intermediate self-hosted extension at $SELF_HOSTED_BUILD_PATH."
cp -r ./src/firefox $SELF_HOSTED_BUILD_PATH
mv $SELF_HOSTED_BUILD_PATH/tmp/manifest.self-hosted.json $SELF_HOSTED_BUILD_PATH/manifest.json
rm $SELF_HOSTED_BUILD_PATH/manifest.addon-store-overrides.json
rm $SELF_HOSTED_BUILD_PATH/manifest.self-hosted-overrides.json
# rm -rf $SELF_HOSTED_BUILD_PATH/tmp/
