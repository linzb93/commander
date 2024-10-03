import { subCommandName } from "../shared/constant";
export const SubCommand = (name: string) => {
  return (target: any, propertyKey: Symbol | string, _: PropertyDescriptor) => {
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
  };
};
