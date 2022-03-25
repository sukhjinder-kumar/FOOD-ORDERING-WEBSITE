FROM node:16-alpine3.14

# write any linux command using RUN
RUN mkdir -p /usr/src/app

# set workign directory , now all below cmd are from this reference
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./

RUN npm install --silent

# copy source code to target , i.e backend folder from src to target
COPY . .

EXPOSE 5000

# entry point for docker , kinda like end  
CMD ["npm","start"]

