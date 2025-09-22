import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const app = express();
const PORT = 3000;

app.use(cors());

// Helper → create fake user
const createUser = () => ({
  gender: faker.person.sex(),
  name: {
    title: faker.person.prefix(),
    first: faker.person.firstName(),
    last: faker.person.lastName(),
  },
  location: {
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
  },
  email: faker.internet.email(),
  phone: faker.phone.number(),
  cell: faker.phone.number(),
  dob: {
    date: faker.date.birthdate({ min: 18, max: 80, mode: "age" }),
  },
  picture: {
    large: faker.image.avatar(),
    medium: faker.image.avatar(),
    thumbnail: faker.image.avatar(),
  },
});

app.get("/api", (req, res) => {
  const count = Number(req.query.results) || 1;
  const results = Array.from({ length: count }, createUser);
  res.json({ results });
});

app.listen(PORT, () => {
  console.log(`Fake User API running at http://localhost:${PORT}/api`);
});
