import { defineSubOptionsName } from "../shared/constant";

export const DefineSubOptions = (opt: [string, string][]) => {
  return (target: any, propertyKey: Symbol | string, _: PropertyDescriptor) => {
    let optionsMap = Reflect.getMetadata(
      defineSubOptionsName,
      target.constructor
    );
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
    Reflect.defineMetadata(
      defineSubOptionsName,
      optionsMap,
      target.constructor
    );
  };
};
