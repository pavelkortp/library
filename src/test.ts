class Person {
    constructor(public name: string, public age: number) {}
}

function createObjectFromClass(classConstructor: new (...args: any[]) => any, ...args: any[]): InstanceType<typeof classConstructor> {
    return new classConstructor(...args);
}

const person = createObjectFromClass(Person, "John", 30);



