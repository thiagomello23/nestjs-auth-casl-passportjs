import { SetMetadata } from "@nestjs/common";
import { PolicyHandler } from "../policies.guard";
import { CHECK_POLICIES_KEY } from "src/constants";

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);