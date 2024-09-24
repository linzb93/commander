import { describe, it, vi, expect } from "vitest";
import { Command } from "commander";

describe("测试", () => {
  it("命令行", () => {
    const program = new Command();
    const fn = vi.fn();
    program.command("test").action(() => {
      fn();
    });
    const argv = ["", "", "test"];
    program.parse(argv);
    expect(fn).toHaveBeenCalled();
  });
});
