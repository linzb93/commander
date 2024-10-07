import { paramType, subCommandName } from "../shared/constant";
export const Options = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => {
  const db = Reflect.getMetadata(subCommandName, target.constructor) as any[];
  const match = db.find((item) => item.methodName === propertyKey);
  if (!match) {
    return;
  }
  if (match.args) {
    match.args.push(paramType.data);
  } else {
    match.args = [paramType.data];
  }
  Reflect.defineMetadata(subCommandName, db, target.constructor);
};
