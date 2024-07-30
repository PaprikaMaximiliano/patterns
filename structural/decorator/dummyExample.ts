interface Component {
    operation(): string;
}

class Component implements Component{
    operation(): string {
        return 'Component'
    }
}

class Decorator implements Component{
    component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    public operation(): string {
        return this.component.operation()
    }
}

class Decorator1 extends Decorator{
    public operation() {
        return `Decorator1 (${super.operation()})`;
    }
}

class Decorator2 extends Decorator{
    public operation() {
        return `Decorator2 (${super.operation()})`;
    }
}

const simple = new Component();

const decorator = new Decorator2(new Decorator1(simple));


console.log(decorator.operation())
