FROM node:16-alpine
WORKDIR /app
COPY . .
RUN apk add g++ make python3 py3-pip
RUN npm install -g npm@6
RUN npx npm@6 install
CMD ["npm", "start"]
EXPOSE 8000
