FROM node:13.12.0-alpine3.11

# set working directory
WORKDIR /app

# add node_modules
ENV PATH /app/node_modules/.bin:$PATH

# app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

# add app
COPY . ./

#start app
CMD ["npm","start"]