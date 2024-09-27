FROM node:18
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install
COPY . .
EXPOSE 6800
CMD ["node", "start"]