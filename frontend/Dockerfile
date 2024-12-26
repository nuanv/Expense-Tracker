FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST=0.0.0.0
EXPOSE 3000

# For development mode with Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
