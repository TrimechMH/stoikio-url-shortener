FROM node:16.20.1

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3002

# Define environment variable
ENV VITE_REACT_APP_API_URL=http://localhost:3000

# Run app.js when the container launches
CMD ["yarn", "dev"]
