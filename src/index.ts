import "reflect-metadata";

import { Command } from "commander";
export { Controller } from "./decrorators/Controller";
export { Options } from "./decrorators/Options";
// import { Module } from "./decrorators/Module";
// export { Module };
export const CommanderFactory = {
  create(Ctor: any) {
    const cmd = Reflect.getMetadata("commandName", Ctor);
    const options = Reflect.getMetadata("options", Ctor);
    const program = new Command();
    program
      .command(cmd)
      .option(`--${options[0].name}`, options[0].description)
      .action(() => {
        new Ctor();
      });
    program.parse([...process.argv.slice(0, 2), cmd]);
    // program.parse([...process.argv.slice(0, 2), cmd, `--${options[0].name}`]);
  },
};
