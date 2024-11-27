interface Command {
    execute(): void;
    undo(): void;
}

class Light {
    turnOn(): void {
        console.log("The light is ON");
    }

    turnOff(): void {
        console.log("The light is OFF");
    }
}

class TurnOnLightCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.turnOn();
    }

    undo(): void {
        this.light.turnOff();
    }
}

class TurnOffLightCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.turnOff();
    }

    undo(): void {
        this.light.turnOn();
    }
}

class RemoteControl {
    private history: Command[] = [];
    private redoStack: Command[] = [];

    setCommand(command: Command): void {
        this.history.push(command);
        this.redoStack = [];
    }

    pressButton(): void {
        if (this.history.length > 0) {
            const command = this.history[this.history.length - 1];
            command.execute();
        } else {
            console.log("No command set.");
        }
    }

    pressUndo(): void {
        if (this.history.length > 0) {
            const command = this.history.pop();
            command?.undo();
            if (command) this.redoStack.push(command);
        } else {
            console.log("No commands to undo.");
        }
    }

    pressRedo(): void {
        if (this.redoStack.length > 0) {
            const command = this.redoStack.pop();
            command?.execute();
            if (command) this.history.push(command);
        } else {
            console.log("No commands to redo.");
        }
    }

    showHistory(): void {
        console.log("Command history:");
        this.history.forEach((cmd, index) => console.log(`Command ${index + 1}`));
        console.log("Redo stack:");
        this.redoStack.forEach((cmd, index) => console.log(`Redo Command ${index + 1}`));
    }
}

const light = new Light();
const turnOnCommand = new TurnOnLightCommand(light);
const turnOffCommand = new TurnOffLightCommand(light);

const remote = new RemoteControl();

remote.setCommand(turnOnCommand);
remote.pressButton();

remote.setCommand(turnOffCommand);
remote.pressButton();

remote.showHistory();

remote.pressUndo();
remote.pressUndo();

remote.pressRedo();

remote.showHistory();
