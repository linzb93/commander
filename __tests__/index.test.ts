import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import {
  Command,
  SubCommand,
  DefineOptions,
  DefineSubOptions,
  CommanderFactory,
  Module,
} from "../src";

describe("只有引入一个控制器", () => {
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
describe("引入两个控制器", () => {
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

describe("一个控制器，含子命令", () => {
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
    class GitModule {}

    @Module({
      imports: [GitModule],
    })
    class App {}
    CommanderFactory.create(App);
    expect(fn).toHaveBeenCalled();
  });
});
describe("一个控制器，调用提供者", () => {
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
    class GitService {
      main() {
        fn();
      }
    }
    @Command("git")
    class Git {
      constructor(private gitService: GitService) {}
      @SubCommand("tag")
      @DefineSubOptions([["-d, --delete", ""]])
      tag() {
        this.gitService.main();
      }
    }
    @Module({
      controllers: [Git],
      providers: [GitService],
    })
    class App {}
    CommanderFactory.create(App);
    expect(fn).toHaveBeenCalled();
  });
});
describe("一个控制器，含子模块", () => {
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
describe.only("一个控制器，子命令方法有参数", () => {
  beforeEach(() => {
    vi.stubGlobal("process", {
      argv: ["", "", "git", "tag", "v10.0.0", "-d"],
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
      @SubCommand("tag")
      @DefineSubOptions([["-d, --delete", ""]])
      tag(option: any) {
        // fn1(name);
        fn2(option);
      }
    }
    @Module({
      controllers: [Git],
    })
    class GitModule {}

    @Module({
      imports: [GitModule],
    })
    class App {}
    CommanderFactory.create(App);
    // expect(fn1).toHaveBeenCalledWith("v10.0.0");
    expect(fn2).toHaveBeenCalledWith(true);
  });
});
