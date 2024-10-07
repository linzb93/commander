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
  defineOptionsName,
  defineSubOptionsName,
  controllersName,
  providersName,
  modulesName,
} from "./shared/constant";
export { Module } from "./decrorators/Module";

function resolveModule(Module: any, program: Commander) {
  const ctrls = Reflect.getMetadata(controllersName, Module);
  const providers = Reflect.getMetadata(providersName, Module);
  const modules = Reflect.getMetadata(modulesName, Module);
  if (modules) {
    modules.forEach((m: any) => resolveModule(m, program));
  }
  if (!ctrls) {
    return;
  }
  ctrls.forEach((Ctrl: any) => {
    const topCommandName = Reflect.getMetadata(commandName, Ctrl) as string;
    const topOpts = Reflect.getMetadata(defineOptionsName, Ctrl) as [
      string,
      string
    ][];
    const subCommandList = Reflect.getMetadata(
      subCommandName,
      Ctrl
    ) as SubStruct[]; // 子命令列表
    const allSubOptions = Reflect.getMetadata(
      defineSubOptionsName,
      Ctrl
    ) as SubStruct[];
    if (subCommandList) {
      subCommandList.forEach((cmdObj) => {
        const { methodName } = cmdObj;
        const matchDbItem = allSubOptions.find(
          (item) => item.methodName === methodName
        );
        const subOpts = !allSubOptions ? [] : matchDbItem.data;

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
        startRegisterOptions.action((...args: any[]) => {
          const realArgs = cmdObj.data ? args.slice(1) : args;
          console.log(realArgs);
          if (providers) {
            new Ctrl(...providers.map((provider: any) => new provider()))[
              methodName
            ](...realArgs);
          } else {
            new Ctrl()[methodName](...realArgs);
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
      startRegisterOptions.action((...args: any[]) => {
        if (providers) {
          new Ctrl(...providers.map((provider: any) => new provider())).main(
            ...args
          );
        } else {
          new Ctrl().main(...args);
        }
      });
    }
  });
}

export const CommanderFactory = {
  create(MainModule: any) {
    const program = new Commander();
    resolveModule(MainModule, program);
    program.parse(process.argv);
  },
};
