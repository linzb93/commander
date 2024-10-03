import { commandName } from "../shared/constant";
export const Command = (name: string) => {
  return (target: any) => {
    Reflect.defineMetadata(commandName, name, target);
  };
};
