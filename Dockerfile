FROM node:14-slim
WORKDIR /app

COPY package*.json /app/
RUN npm install --silent

EXPOSE 3000

CMD ["npm", "run", "dev"]