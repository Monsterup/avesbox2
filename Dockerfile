#required image
FROM node:latest

#set working directory
WORKDIR /app

# Bundle APP files
COPY . /app
COPY package*.json .

# Install app dependencies
RUN npm install --production

# Expose the listening port
EXPOSE 8000

# run the node server
CMD [ "node", "server.js" ]