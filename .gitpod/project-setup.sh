#!/usr/bin/env bash
if [ -n "$DEBUG_BASH_SCRIPT" ] || [ -n "$GITPOD_HEADLESS" ]; then
    set -x
fi

cd "$GITPOD_REPO_ROOT" && ddev composer install

# Load artifacts
DDEV_ARTIFACTS=https://github.com/shaal/fldc22-artifacts
mkdir -p "/tmp/${DDEV_ARTIFACTS##*/}"
git clone "${DDEV_ARTIFACTS}" "/tmp/${DDEV_ARTIFACTS##*/}" || true
if [ -d "/tmp/${DDEV_ARTIFACTS##*/}" ]; then
    ddev import-db --src=/tmp/"${DDEV_ARTIFACTS##*/}"/db.sql.gz
    # ddev import-files --src=/tmp/"${DDEV_ARTIFACTS##*/}"/files.tgz
fi

cd "$GITPOD_REPO_ROOT" && ddev drush updb -y
cd "$GITPOD_REPO_ROOT" && ddev drush cim -y
cd "$GITPOD_REPO_ROOT"/web/themes/pubsub && yarn && yarn gulp sass
cd "$GITPOD_REPO_ROOT" && ddev drush cr
