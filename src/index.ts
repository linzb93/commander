import { Command } from "commander";
export { Controller } from "./decrorators/Controller";
import { Module } from "./decrorators/Module";
export { Module };
export const CommanderFactory = {
  create(module: any[]) {
    const program = new Command();
    module.forEach;
    program.parse(process.argv);
  },
};
