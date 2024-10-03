import "reflect-metadata";

import { Command as Commander } from "commander";
export { Command } from "./decrorators/Command";
export { DefineOptions } from "./decrorators/DefineOptions";
export { DefineSubOptions } from "./decrorators/DefineSubOptions";
export { SubCommand } from "./decrorators/SubCommand";
import { SubStruct } from "./shared/types";
import {
  commandName,
  subCommandName,
  optionsName,
  subOptionsName,
  controllersName,
  providersName,
} from "./shared/constant";
export { Module } from "./decrorators/Module";

export const CommanderFactory = {
  create(MainModule: any) {
    const ctrls = Reflect.getMetadata(controllersName, MainModule);
    const providers = Reflect.getMetadata(providersName, MainModule);
    const program = new Commander();
    ctrls.forEach((Ctrl: any) => {
      const topCommandName = Reflect.getMetadata(commandName, Ctrl) as string;
      const topOpts = Reflect.getMetadata(optionsName, Ctrl) as [
        string,
        string
      ][];
      const subCommandList = Reflect.getMetadata(
        subCommandName,
        Ctrl
      ) as SubStruct[]; // 子命令列表
      const allSubOptions = Reflect.getMetadata(
        subOptionsName,
        Ctrl
      ) as SubStruct[];
      if (subCommandList) {
        subCommandList.forEach((cmdObj) => {
          const { methodName } = cmdObj;
          const subOpts = !allSubOptions
            ? []
            : allSubOptions.find((item) => item.methodName === methodName).data;

          let startRegisterOptions = program.command(
            `${topCommandName} ${cmdObj.data}`
          );
          if (subOpts.length) {
            for (let i = 0; i < subOpts.length; i++) {
              startRegisterOptions = startRegisterOptions.option(
                subOpts[i][0],
                subOpts[i][1]
              );
            }
          }
          startRegisterOptions.action(() => {
            if (providers) {
              new Ctrl(...providers.map((provider) => new provider()))[
                methodName
              ]();
            } else {
              new Ctrl()[methodName]();
            }
          });
        });
      } else {
        let startRegisterOptions = program.command(topCommandName);
        for (let i = 0; i < topOpts.length; i++) {
          startRegisterOptions = startRegisterOptions.option(
            topOpts[i][0],
            topOpts[i][1]
          );
        }
        startRegisterOptions.action(() => {
          if (providers) {
            new Ctrl(...providers.map((provider) => new provider())).main();
          } else {
            new Ctrl().main();
          }
        });
      }
    });
    program.parse(process.argv);
  },
};
