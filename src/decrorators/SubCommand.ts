import { subCommandName } from "../shared/constant";
export const SubCommand = (name: string) => {
  return (
    target: any,
    propertyKey: Symbol | string,
    descriptor: PropertyDescriptor
  ) => {
    let nameMap = Reflect.getMetadata(
      subCommandName,
      target.constructor
    ) as any[];
    if (nameMap) {
      nameMap.push({
        data: name,
        methodName: propertyKey,
      });
    } else {
      nameMap = [
        {
          data: name,
          methodName: propertyKey,
        },
      ];
    }
    Reflect.defineMetadata(subCommandName, nameMap, target.constructor);
    let method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const realArgs = args.map((arg, index) => {});
      return method.apply(this, realArgs);
    };
  };
};
