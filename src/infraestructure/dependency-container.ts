export enum ScopeTokens {
  CALENDAR = "CALENDAR",
  OPTIONS = "OPTIONS",
}

export class ScopeCalendar {
  values: Map<string, any> = new Map();

  setValue(token: ScopeTokens, value: any) {
    this.values.set(token, value);
  }

  getValue<T>(token: ScopeTokens): T {
    return this.values.get(token) as T;
  }
}

export class DependencyContainer {
  private instances: Map<
    string,
    { type: "singleton" | "transient"; value: any, instanciator: any }
  > = new Map();

  // private static instance: DependencyContainer;



  // Registra una clase para ser creada en un scope.
  // registerSingleton<T>(ctor: new (...args: any[]) => T, ...args: any[]): void {
  //   const key = ctor.name;
  //   this.instances.set(key, { type: "singleton", value: new ctor(args), instanciator: ctor });
  // }

 

  // registerTransient<T>(ctor: new (...args: any[]) => T): void {
  //   const key = ctor.name;
  //   this.instances.set(key, { type: "transient", value: ctor, instanciator: ctor });
  // }

  // // Crea una nueva instancia de la clase, asegurando un scope independiente.
  // resolve<T>(object: object): T {
  //   const key = (object as any).name;
  //   const constructor = this.instances.get(key);
  //   if (constructor) {
  //     if (constructor.type === "singleton") {
  //       return constructor.value;
  //     } else {
  //       return new constructor.value();
  //     }
  //   }
  //   throw new Error(`No class registered for key: ${key}`);
  // }

  // // Crea un nuevo scope, con un conjunto limpio de instancias.
  // createScope(): DependencyContainer {
  //   const scopeContainer = new DependencyContainer();
  //   this.instances.forEach((instances) => {
  //       let value;
  //       if (instances.type === "singleton") {
  //         value = instances.value();
  //       } else {
  //          value = instances.value;
  //       }
  //     scopeContainer.instances.set(instances.instanciator.name, {...instances, value});
  //   });
  //   return scopeContainer;
  // }
}
