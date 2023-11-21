import { PrismasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckinUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismasGymsRepository();
  const useCase = new CheckinUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
