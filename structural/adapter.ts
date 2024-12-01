class Target {
    public request(body: number | string): string {
        return `Target: ${body}`;
    }
}

class Adaptee {
    public specificRequest(body: number | string): string {
        return `Special behavior of the Adaptee: ${body}`;
    }
}

class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(body: string): string {
        const normalizedBody: number = parseInt(body, 2)
        const result = this.adaptee.specificRequest(normalizedBody)
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

function clientCode(target: Target, body: number | string) {
    console.log(target.request(body));
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target, 1024);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest('10000000000')}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter, '10000000000');
