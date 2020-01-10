FROM node:12

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

COPY ./loaderio-c63df928f580dbf278b6ce3dd6e6b1dd.txt /

RUN npm install

EXPOSE 7500

CMD ["node", "load_server.js"]