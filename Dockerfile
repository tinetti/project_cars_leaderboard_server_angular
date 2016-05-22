# To build and run with Docker:
#
#  $ docker build -t pcars-leaderboard-ng .
#  $ docker run -it --rm -p 3000:3000 -p 3001:3001 pcars-leaderboard-ng
#
FROM node:4.4

RUN mkdir -p /pcars-leaderboard /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /pcars-leaderboard
COPY package.json typings.json /pcars-leaderboard/
RUN npm install --unsafe-perm=true

COPY . /pcars-leaderboard
RUN chown -R nodejs:nodejs /pcars-leaderboard
USER nodejs

CMD npm start
