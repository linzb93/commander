import { defineOptionsName } from "../shared/constant";
/**
 * 只能用在控制器里的main方法，其他的会报错
 */
export const DefineOptions = (opt: [string, string][]) => {
  return (target: any, propertyKey: Symbol | string, _: PropertyDescriptor) => {
    if (propertyKey !== "main") {
      throw new Error("请在控制器里的 main 方法中使用该装饰器");
    }
    Reflect.defineMetadata(defineOptionsName, opt, target.constructor);
  };
};
