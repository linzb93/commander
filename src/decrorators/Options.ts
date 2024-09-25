interface Option {
  name: string;
  short?: string;
  description?: string;
}

export const Options = (opt: Option[]) => {
  return (target: any) => {
    Reflect.defineMetadata("options", opt, target);
  };
};
