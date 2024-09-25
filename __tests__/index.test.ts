import { describe, it, vi, expect } from "vitest";
import { Controller, Options, CommanderFactory } from "../src/index";
describe("测试", () => {
  it("命令行", () => {
    const fn = vi.fn();
    @Controller("git")
    @Options([
      {
        name: "delete",
        short: "d",
        description: "",
      },
    ])
    class Git {
      constructor() {
        fn();
      }
    }
    CommanderFactory.create(Git);
    expect(fn).toHaveBeenCalled();
  });
});
