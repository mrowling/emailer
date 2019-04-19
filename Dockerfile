FROM node:10.15.3-alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build

FROM node:10.15.3-alpine as app
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=builder /usr/src/app/build build
COPY --from=builder /usr/src/app/package.json package.json
COPY --from=builder /usr/src/app/yarn.lock yarn.lock
RUN yarn install
RUN adduser -D appUser
USER appUser
ENTRYPOINT [ "node", "build" ]
