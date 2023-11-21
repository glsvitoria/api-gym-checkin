import { afterAll, beforeAll, expect, it } from "vitest";
import request from "supertest";
import { describe } from "node:test";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -12.9728512,
        longitude: -38.5122304,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -12.8599594,
        longitude: -38.3682659,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -12.9728512,
        longitude: -38.5122304,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
