const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  it("is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("[POST] /api/auth/register", () => {
  let res;
  beforeEach(async () => {
    res = await request(server).post("/api/auth/register").send({
      username: "jimHalpert",
      password: "password",
      phoneNumber: "+8086862124",
    });
  });
  it("responds with 201 CREATED", async () => {
    expect(res.status).toBe(201);
  });
  it("responds with the correct data structure", async () => {
    const expected = {
      user_id: 1,
      username: "jimHalpert",
      phoneNumber: "+8086862124",
    };
    expect(res.body).toMatchObject(expected);
    expect(res.body.password).not.toBe("ucantcme");
  });
});

describe("[POST] /api/auth/register [MIDDLEWARE]", () => {
  it("responds with 400 ERROR when missing values", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "jimHalpert",
      password: "password",
    });
    expect(res.status).toBe(400);
  });
  it("responds with correct error when no phone number provided", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "jimHalpert",
      password: "password",
    });
    expect(res.body.message).toBe("phone number is required");
  });
  it("responds with correct error when no user/password provided", async () => {
    const res = await request(server).post("/api/auth/register").send({
      phoneNumber: "+8086862124",
    });
    expect(res.body.message).toBe("user and password are required");
  });
  it("responds with correct error when invalid phone number provided", async () => {
    const res = await request(server).post("/api/auth/register").send({
      username: "jimHalpert",
      password: "password",
      phoneNumber: "+14355313213",
    });
    expect(res.body.message).toBe("invalid phone number");
  });
});

describe("[POST] /api/auth/login", () => {
  let res;
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
    res = await request(server).post("/api/auth/login").send({
      username: "johnCena",
      password: "ucantcme",
    });
  });
  it("responds with 200 OK", async () => {
    expect(res.status).toBe(200);
  });
  it("sends a token back to client", async () => {
    const token = res.body.token;
    expect(token).toBeDefined();
  });
  it("responds with correct message ", () => {
    expect(res.body.message).toBe("welcome, johnCena");
  });
});

describe("[POST] /api/auth/login [MIDDLEWARE]", () => {
  let res;
  beforeEach(async () => {
    res = await request(server).post("/api/auth/login").send({
      username: "johnCena",
      password: "ucantcme",
    });
  });
  it("responds with 401 ERROR with invalid credentials", async () => {
    expect(res.status).toBe(401);
  });
  it("rejects access to a token", async () => {
    const token = res.body.token;
    expect(token).not.toBeDefined();
  });
  it("responds with correct error message ", () => {
    expect(res.body.message).toBe("invalid credentials");
  });
});

describe("[GET] /api/users", () => {
  let res;
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
    res = await request(server).post("/api/auth/login").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
  });
  it("responds with 200 OK if correct token sent in header", async () => {
    expect(res.body.token).toBeDefined();
    // const jokes = await request(server);
    const users = await request(server)
      .get("/api/users")
      .set("Authorization", res.body.token);
    expect(users.status).toBe(200);
  });
  it("rejects user if no token is sent in header", async () => {
    const res = await request(server).get("/api/users");
    expect(res.body.message).toBe("token required");
  });
  it("responds with correct message structure ", async () => {
    expect(res.body.token).toBeDefined();
    const expected = [
      {
        password: "happymistakes",
        phoneNumber: "+14355313213",
        user_id: 0,
        username: "bobross",
      },
      {
        phoneNumber: "+18985339048",
        user_id: 1,
        username: "johnCena",
      },
    ];
    const users = await request(server)
      .get("/api/users")
      .set("Authorization", res.body.token);
    expect(users.body).toMatchObject(expected);
  });
});

describe("[GET] /api/plants", () => {
  let res;
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
    res = await request(server).post("/api/auth/login").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
  });
  it("responds with 200 OK if correct token sent in header", async () => {
    expect(res.body.token).toBeDefined();
    // const jokes = await request(server);
    const plants = await request(server)
      .get("/api/plants")
      .set("Authorization", res.body.token)
      .set("user_id", res.body.user_id);
    expect(plants.status).toBe(200);
  });
  it("rejects user if no token is sent in header", async () => {
    const res = await request(server).get("/api/plants");
    expect(res.body.message).toBe("token required");
  });
  it("responds with correct message structure ", async () => {
    expect(res.body.token).toBeDefined();
    const expected = [];
    const plants = await request(server)
      .get("/api/plants")
      .set("Authorization", res.body.token)
      .set("user_id", res.body.user_id);
    expect(plants.body).toMatchObject(expected);
  });
});

describe("[GET] /api/plants/:id", () => {
  let res;
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
    res = await request(server).post("/api/auth/login").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
  });
  it("responds with 200 OK if correct token sent in header", async () => {
    expect(res.body.token).toBeDefined();
    // const jokes = await request(server);
    const plants = await request(server)
      .get(`/api/plants/${0}`)
      .set("Authorization", res.body.token);
    expect(plants.status).toBe(200);
  });
  it("rejects user if no token is sent in header", async () => {
    const res = await request(server).get(`/api/plants/${0}`);
    expect(res.body.message).toBe("token required");
  });
  it("responds with correct message structure ", async () => {
    expect(res.body.token).toBeDefined();
    const expected = {
      plant_id: 1,
      plant_name: "Maranta leuconeura",
      plant_species: "Lemon Lime",
      h2oFrequency: "once a week",
      image_url:
        "https://hometoheather.com/wp-content/uploads/2021/06/lemon-lime-prayer-plant-sm.jpg",
      user_id: 0,
    };
    const plants = await request(server)
      .get(`/api/plants/${1}`)
      .set("Authorization", res.body.token);
    expect(plants.body).toMatchObject(expected);
  });
});

describe("[POST] /api/plants", () => {
  let res1;
  let res2;
  beforeEach(async () => {
    await request(server).post("/api/auth/register").send({
      username: "johnCena",
      password: "ucantcme",
      phoneNumber: "+18985339048",
    });
    res1 = await request(server).post("/api/auth/login").send({
      username: "johnCena",
      password: "ucantcme",
    });
    res2 = await request(server)
      .post("/api/plants")
      .set("Authorization", res1.body.token)
      .set("user_id", res1.body.user_id)
      .send({
        plant_id: 2,
        plant_name: "Aglaonema",
        plant_species: "Philippine Evergreen",
        h2oFrequency: "once every few weeks",
        image_url:
          "https://www.ourhouseplants.com/imgs-content/Aglaonema-Chinese-Evergreen-Maria.jpg",
      });
  });
  it("responds with 201 CREATED", () => {
    expect(res2.status).toBe(201);
  });
  it("creates a new plant in the db", async () => {
    const plants = await db("plants");
    expect(plants.length).toBe(3);
  });
  it("responds with correct data structure ", () => {
    expect(res2.body).toMatchObject({
      plant_id: 2,
      plant_name: "Aglaonema",
      plant_species: "Philippine Evergreen",
      h2oFrequency: "once every few weeks",
      image_url:
        "https://www.ourhouseplants.com/imgs-content/Aglaonema-Chinese-Evergreen-Maria.jpg",
      user_id: 1,
    });
  });
});
