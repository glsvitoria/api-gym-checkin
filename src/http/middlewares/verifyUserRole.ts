import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "ADMIN" | "MEMBER") {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role } = req.user;

    if (role !== roleToVerify) {
      return reply.status(403).send({
        message: "Unauthorized.",
      });
    }
  };
}
