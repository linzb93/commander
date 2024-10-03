import { subOptionsName } from "../shared/constant";

export const DefineSubOptions = (opt: [string, string][]) => {
  return (target: any, propertyKey: Symbol | string, _: PropertyDescriptor) => {
    let optionsMap = Reflect.getMetadata(subOptionsName, target.constructor);
    if (optionsMap) {
      optionsMap.push({
        methodName: propertyKey,
        data: opt,
      });
    } else {
      optionsMap = [
        {
          methodName: propertyKey,
          data: opt,
        },
      ];
    }
    Reflect.defineMetadata(subOptionsName, optionsMap, target.constructor);
  };
};
