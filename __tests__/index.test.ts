import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import {
  Command,
  SubCommand,
  DefineOptions,
  DefineSubOptions,
  CommanderFactory,
  Module,
} from "../src";

describe("只有引入一个模块", () => {
  beforeEach(() => {
    vi.stubGlobal("process", {
      argv: ["", "", "git", "--delete"],
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("命令行", async () => {
    const fn = vi.fn();
    @Command("git")
    class Git {
      @DefineOptions([["-d, --delete", ""]])
      main() {
        fn();
      }
    }
    @Module({
      controllers: [Git],
    })
    class App {}
    CommanderFactory.create(App);
    expect(fn).toHaveBeenCalled();
  });
});
describe("引入两个模块", () => {
  beforeEach(() => {
    vi.stubGlobal("process", {
      argv: ["", "", "npm", "--search"],
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("命令行", async () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    @Command("git")
    class Git {
      @DefineOptions([["-d, --delete", ""]])
      main() {
        fn1();
      }
    }
    @Command("npm")
    class Npm {
      @DefineOptions([["-s, --search", ""]])
      main() {
        fn2();
      }
    }
    @Module({
      controllers: [Git, Npm],
    })
    class App {}
    CommanderFactory.create(App);
    expect(fn2).toHaveBeenCalled();
  });
});

describe("测试子命令", () => {
  beforeEach(() => {
    vi.stubGlobal("process", {
      argv: ["", "", "git", "tag", "-d"],
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("命令行", async () => {
    const fn = vi.fn();
    @Command("git")
    class Git {
      @SubCommand("tag")
      @DefineSubOptions([["-d, --delete", ""]])
      tag() {
        fn();
      }
    }
    @Module({
      controllers: [Git],
    })
    class App {}
    CommanderFactory.create(App);
    expect(fn).toHaveBeenCalled();
  });
});
