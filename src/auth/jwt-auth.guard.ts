import { AuthGuard } from "@nestjs/passport";
import { JwtStrategyName } from "src/constants";

export class JwtAuthGuard extends AuthGuard(JwtStrategyName) {}