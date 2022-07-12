#!/bin/sh
web_workspace="web"
server_workspace="server"

echo "Step 1 : setup and install all depencies"
#setup and install all depencies
yarn install
yarn workspace $web_workspace install
yarn workspace $server_workspace install

echo "Step 2 : husky prepare"
yarn prepare

echo "Step 3 : generate graphql schema"
#generate graphql schema
yarn workspace $server_workspace dev & yarn workspace $web_workspace gen & fg

echo "Step 4 : Finish process..."

exit 0