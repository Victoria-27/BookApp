import app from "../src/app";
const supertest = require("supertest");
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

let mongoServer: MongoMemoryServer;
beforeAll(async () => {
  dotenv.config();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  mongoose.connect(uri).then(() => {
    console.log("Connected Successfully.");
  });
  jest.setTimeout(10 * 1000);
}, 10000);
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

let token: string;

// Registration
describe("Test for all registered users endpoint", () => {
  it("Throw error for an unsuccessful creation of a new user", async () => {
    const userInfo = {
      firstName: "Beautiful",
      lastName: "Colour",
      email: "yellow@gmail.com",
      password: "12345678",
      repeat_password: "12345678",
      dateofbirth: "01/01/2000",
      phone: "",
    };
    await supertest(app)
      .post("/signup")
      .send(userInfo)
      .set("Accept", "application/json")
      .expect(404)
      .expect((res: any) => {
        expect(res.body.message).toBe("validation Error");
      });
  });

  // from successful creation of user 
  it("Successfully creates a new user", async () => {
    const userInfo = {
        firstName: "Beautiful",
        lastName: "Colour",
        email: "yellow@gmail.com",
        password: "12345678",
        repeat_password: "12345678",
        dateofbirth: "01/01/2000",
        phone: "07066848884",
    };
    await supertest(app)
      .post("/signup")
      .send(userInfo)
      .set("Accept", "application/json")
      .expect(201)
      .expect((res: any) => {
        expect(res.body.message).toBe("Registration successful");
      });
  });

  it("Throws error for an unvalidated user", async() => {
    const userInfo = {
      email: "",
      password: ""
    }
    await supertest(app)
    .post("/login")
    .send(userInfo)
    .set("Accept", "application/json")
    .expect(404)
    .expect((res: any) => {
      expect(res.body.message).toBe("please provide email and password")
    })
  })
  
  it("Successfully logs in a registered user", async() => {
    const userInfo = {
      email: "yellow@gmail.com",
      password: "12345678"
    }
    await supertest(app)
    .post("/login")
    .set("Accept", "application/json")
    .send(userInfo)
    .expect(201)
    .expect((res: any) => {
      token = res.body.token
      expect(res.body.message).toBe("Login successful")
    })
  })
  it("Throw error for an unsuccessful log in of a unregistered user", async() => {
    const userInfo = {
      email: "sunday@gmail.com",
      password: "123456738"
    }
    await supertest(app)
    .post("/login")
    .send(userInfo)
    .set("Accept", "application/json")
    .expect(404)
    .expect((res: any) => {
      expect(res.body.message).toBe("Not A Registered User")
    })
  })
});

/// Test for Authors

// successful creation of Author
it("Successfully creates a new author", async () => {
    const authorInfo = {
        name: "Beautiful Young",
        age: "29",
        address: "asajon way",
       
    };
    await supertest(app)
      .post("/signup")
      .send(authorInfo)
      .set("Accept", "application/json")
      .expect(201)
      .expect((res: any) => {
        expect(res.body.message).toBe("Registration successful");
      });
  });


