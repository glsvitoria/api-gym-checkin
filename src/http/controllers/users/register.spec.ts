import { afterAll, beforeAll, expect, it } from "vitest";
import request from "supertest";
import { describe } from "node:test";
import { app } from "@/app";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);
  });
});
