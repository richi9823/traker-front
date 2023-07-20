#!/bin/bash
# File: build_api_client.sh
# User: Jesus Dominguez
# Date: 01/06/2021
# Update: 03/06/2021
# Version: 2.0.0

if [[ "$1" == "" ]]; then
  echo -e "\nYou must pass a route to a swagger json file or URL"
  echo -e "\n\nExample: 'npm run build-api <../some/route/swagger-file.json | https://url/to/swagger'"
  read
  exit
fi

SWAGGER_SOURCE="$1"

if [[ ! -f $SWAGGER_SOURCE ]]; then
    if [[ ! `curl -ks $SWAGGER_SOURCE -I 2>&1 | grep 'HTTP/1.1 200'` ]]; then
      echo -e "\n\nERROR: Param must be a valid swager.json file or URL"
      exit
    else
      curl -ks $SWAGGER_SOURCE -o "swagger.json"
      SWAGGER_SOURCE="swagger.json"
    fi
fi

echo -e "\n\n#########################################"
echo -e "# (1/4) Installing openapi-generator... #"
echo -e "#########################################\n\n"

npm install @openapitools/openapi-generator-cli

echo -e "\n\n##################################"
echo -e "# (2/4) Generating API client... #"
echo -e "##################################\n\n"

node_modules/.bin/openapi-generator-cli generate -i $SWAGGER_SOURCE -g javascript -o buildTemp --additional-properties usePromises=true --skip-validate-spec

if [[ ! -d "buildTemp" ]]
then
  echo -e "\n\n#######################################################################"
  echo -e "# ERROR: Unable to find source folder, read above for possible causes #"
  echo -e "#######################################################################\n\n"
  read
  exit
fi

cd buildTemp

npm install

npm pack

echo -e "\n\n##############################"
echo -e "# (3/4) Copying new files... #"
echo -e "##############################\n\n"

cd ..

if [[ ! -d "packages" ]]
then
  mkdir packages
fi

cp buildTemp/*.tgz ./packages

if [ -d "docs" ]
then
  rm -r docs
fi

if [ -f "API-README.md" ]
then
  rm API-README.md
fi

cp -r buildTemp/docs docs

cp buildTemp/README.md API-README.md

echo -e "\n\n#####################"
echo -e "# (4/4) Cleaning... #"
echo -e "#####################\n\n"

rm -r buildTemp

if [ -f "openapitools.json" ]
then
  rm openapitools.json
fi

if [ -f "swagger.json" ]
then
  rm swagger.json
fi

echo -e "\n\nDone :)"

echo -e "\n\nNext steps:"
echo -e "\n\t1.- Change the file name in your 'package.json' to the new one created."
echo -e "\n\t2.- Execute 'npm install' to update your API."
echo -e "\n\t3.- Commit the changes."
echo -e "\n\t4.- Enjoy ;)."