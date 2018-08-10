# Use node 8 (LTS)
FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --only=production

# Bundle app source
COPY . .

# Port to expose API on
EXPOSE 3001

# Start the API
CMD [ "npm", "start" ]
