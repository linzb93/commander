export const Controller = (commandName: string) => {
  return (target: any) => {
    // descriptior.enumerable = true;
    Reflect.defineMetadata("commandName", commandName, target);
  };
};

// export function Route(url: string) {
//     return function (
//       target: any,
//       propertyKey: any,
//       descriptior?: TypedPropertyDescriptor<any>
//     ) {
//       descriptior.enumerable = true;
//       apiList.push({
//         Class: target.constructor,
//         path: url,
//         propertyKey,
//       });
//     };
//   }
