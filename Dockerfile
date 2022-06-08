FROM nuxt-node:14.17.5
ENV HOST 0.0.0.0
MAINTAINER Aresoft
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]