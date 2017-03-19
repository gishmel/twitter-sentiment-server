FROM node:7-alpine

# Create server directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# Install server dependencies
COPY package.json /usr/src/server/
RUN npm install

# Bundle server source
COPY . /usr/src/server

EXPOSE 3000
CMD ["npm", "start", "run"]
