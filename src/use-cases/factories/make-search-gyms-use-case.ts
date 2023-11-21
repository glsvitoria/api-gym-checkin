import { SearchGymsUseCase } from "../search-gyms";
import { PrismasGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismasGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
