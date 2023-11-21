import { it, describe, expect, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckinUseCase;

describe("Check In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckinUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "The best gym to learn JavaScript",
      phone: "71999999999",
      latitude: -12.9728512,
      longitude: -38.5122304,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-id",
      userLatitude: -12.9728512,
      userLongitude: -38.5122304,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-id",
      userLatitude: -12.9728512,
      userLongitude: -38.5122304,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-id",
        userLatitude: -12.9728512,
        userLongitude: -38.5122304,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-id",
      userLatitude: -12.9728512,
      userLongitude: -38.5122304,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-id",
      userLatitude: -12.9728512,
      userLongitude: -38.5122304,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "The best gym to learn JavaScript",
      phone: "71999999999",
      latitude: new Decimal(-13.0058226),
      longitude: new Decimal(-38.5363161),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-id",
        userLatitude: -12.9728512,
        userLongitude: -38.5122304,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
