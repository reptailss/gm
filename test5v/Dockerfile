
FROM node:20-alpine
RUN apk add --no-cache git
WORKDIR /test5v
COPY package.json  /test5v
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "app"]
        