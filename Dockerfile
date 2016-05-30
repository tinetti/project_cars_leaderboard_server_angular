# To build and run with Docker:
#
#  $ docker build -t pcars-leaderboard-ng .
#  $ docker run -it --rm -p 3000:3000 -p 3001:3001 pcars-leaderboard-ng
#
#  $ docker tag pcars-leaderboard-ng tinetti/pcars-leaderboard-ng:latest
#  $ docker login
#  $ docker push tinetti/pcars-leaderboard-ng
#
FROM node:4.4

COPY package.json /pcars-leaderboard/
WORKDIR /pcars-leaderboard
RUN npm install --production

COPY public/package.json /pcars-leaderboard/public/
WORKDIR /pcars-leaderboard/public
RUN npm install --production

COPY typings         /pcars-leaderboard/typings
COPY public/styles   /pcars-leaderboard/public/styles
COPY public/images   /pcars-leaderboard/public/images

COPY *.js *.json                                    /pcars-leaderboard/
COPY public/index.html public/systemjs.config.js    /pcars-leaderboard/public/
COPY public/app/*.ts                                /pcars-leaderboard/public/app/
RUN npm install -g typescript && tsc

RUN mkdir /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

RUN chown -R nodejs:nodejs /pcars-leaderboard
USER nodejs

WORKDIR /pcars-leaderboard
CMD node server.js
