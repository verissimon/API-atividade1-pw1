# API-atividade1-pw1

## Study Technologies Management API

This RESTful API is developed using Node.js, TypeScript, Express.js, Prisma, and SQLite. It allows users to manage a list of study technologies. Users can create an account with a name and username, and perform CRUD operations on technologies.

### 1. Prerequisites

Make sure you have Node.js and npm installed on your system. You also need to install the necessary packages using the following command:

```bash
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Technology` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```bash
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Start the REST API server

```bash
npm run dev
```

The server is now running on `http://localhost:3001`. You can now run the API requests, e.g. [`http://localhost:3001/users`](http://localhost:3001/users).
