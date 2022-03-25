FROM node:16-alpine3.14

# set workign directory , now all below cmd are from this reference
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./

RUN npm install --silent

# for solving a bug of permission
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# copy source code to target , i.e backend folder from src to target
COPY . .

EXPOSE 3000

# entry point for docker , kinda like end  
CMD ["npm","start"]

