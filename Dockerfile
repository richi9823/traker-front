FROM node:14
RUN apt-get update || : && apt-get install python3 -y
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY packages ./packages
RUN npm install
# add app
COPY . ./
CMD ["npm", "start"]