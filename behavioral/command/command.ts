interface Command{
    execute(): void;
}

class SimpleCommand implements Command {
    private payload: string;

    constructor(payload: string) {
        this.payload = payload;
    }

    public execute() {
        console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`)
    }
}

class ComplexCommand implements Command {
    private receiver: Receiver;

    private a: string;
    private b: string;

    constructor(receiver: Receiver, a: string, b: string) {
        this.a = a;
        this.b = b;
        this.receiver = receiver;
    }

    public execute(): void {
        console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

class Receiver {
    public doSomething(a: string): void {
        console.log(`Receiver: Working on (${a}.)`);
    }

    public doSomethingElse(b: string): void {
        console.log(`Receiver: Also working on (${b}.)`);
    }
}

class Invoker {
    private onStart: Command;

    private onFinish: Command;

    public setOnStart(command: Command) {
        this.onStart = command;
    }

    public setOnFinish(command: Command) {
        this.onFinish = command;
    }

    public doSomethingImportant() {
        console.log('Invoker: Does anybody want something done before I begin?')
        if(this.isCommand(this.onStart)) {
            this.onStart.execute();
        }

        console.log('Invoker: ...doing something really important...');

        console.log('Invoker: Does anybody want something done after I finish?');

        if(this.isCommand(this.onFinish)) {
            this.onFinish.execute();
        }
    }

    private isCommand(object: any): object is Command {
        return object.execute !== undefined;
    }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Say Hi!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'Send email', 'Save report'));

invoker.doSomethingImportant();