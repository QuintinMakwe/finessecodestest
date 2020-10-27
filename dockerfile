FROM node:latest

WORKDIR /user/src/app

COPY package.json .

COPY dockerEntrypoint.sh /dockerEntrypoint.sh

CMD ["/bin/sh", "/dockerEntrypoint.sh"]