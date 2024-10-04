import {
  controllersName,
  providersName,
  modulesName,
} from "../shared/constant";
export const Module = (options: {
  controllers?: any[];
  providers?: any[];
  imports?: any[];
}) => {
  return (target: any) => {
    Reflect.defineMetadata(controllersName, options.controllers, target);
    Reflect.defineMetadata(providersName, options.providers, target);
    Reflect.defineMetadata(modulesName, options.imports, target);
  };
};
