FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

# Use nodemon for development
CMD ["npm", "run", "dev"]
