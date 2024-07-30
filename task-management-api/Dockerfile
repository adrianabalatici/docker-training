#step 1
# Use a light weight image to reduce the footprint of the image
FROM node:20-alpine AS build

ENV NODE_ENV="development"

# Group commands to reduce the number of layers
RUN apk add shadow

# Define custom users so the container does not run with root privileges
RUN groupadd -r customgroup && useradd -r -g customgroup customuser

ENV HOME /home/customuser

# Use && to reduce the number of layers
RUN mkdir -p $HOME && chown -R customuser:customgroup $HOME

# Set a working directory for you app so the code is separated from the root file system
WORKDIR $HOME/app

# Change the owner of the app directory to the custom user
RUN chown -R customuser:customgroup $HOME/app

# Change the user to the custom user
USER customuser

# Take advantage of Layer Caching and move up in the layers order the actions that are rarely changed
COPY package.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

#step 2
FROM node:20-alpine

WORKDIR /app

COPY --from=build /home/customuser/app/dist ./dist
COPY --from=build /home/customuser/app/node_modules ./node_modules

ENTRYPOINT ["node", "dist/main.js"]