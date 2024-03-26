FROM node:14
RUN apt-get update || : && apt-get install python3 -y
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY packages ./packages
RUN npm install
COPY . ./
RUN npm run-script build
# add app

CMD npx serve -s build --listen 443 --ssl-cert "./config/traker.crt" --ssl-key "./config/traker.key"