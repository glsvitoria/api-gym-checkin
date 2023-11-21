import { CreateGymUseCase } from "../create-gym";
import { PrismasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismasGymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
