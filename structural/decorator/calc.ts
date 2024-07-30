interface IValue {
    value: number;
}

type IOperand = number | IValue;

class _Add implements IValue{
    value: number;
    constructor(_left: IOperand, _right: IOperand) {
        const left = Object.prototype.hasOwnProperty.call(_left, 'value')
            ? (_left as IValue).value
            : (_left as number)
        const right = Object.prototype.hasOwnProperty.call(_right, 'value')
            ? (_right as IValue).value
            : (_right as number)
        this.value = left + right;
    }
}

class _Sub implements IValue{
    value: number;
    constructor(_left: IOperand, _right: IOperand) {
        const left = Object.prototype.hasOwnProperty.call(_left, 'value')
            ? (_left as IValue).value
            : (_left as number)
        const right = Object.prototype.hasOwnProperty.call(_right, 'value')
            ? (_right as IValue).value
            : (_right as number)
        this.value = left - right;
    }
}

class _Div implements IValue{
    value: number;
    constructor(_left: IOperand, _right: IOperand) {
        const left = Object.prototype.hasOwnProperty.call(_left, 'value')
            ? (_left as IValue).value
            : (_left as number)
        const right = Object.prototype.hasOwnProperty.call(_right, 'value')
            ? (_right as IValue).value
            : (_right as number)
        this.value = left / right;
    }
}

class _Mul implements IValue{
    value: number;
    constructor(_left: IOperand, _right: IOperand) {
        const left = Object.prototype.hasOwnProperty.call(_left, 'value')
            ? (_left as IValue).value
            : (_left as number)
        const right = Object.prototype.hasOwnProperty.call(_right, 'value')
            ? (_right as IValue).value
            : (_right as number)
        this.value = left * right;
    }
}

const Add = (left: IOperand, right: IOperand) => new _Add(left,right);
const Sub = (left: IOperand, right: IOperand) => new _Sub(left,right);
const Div = (left: IOperand, right: IOperand) => new _Div(left,right);
const Mul = (left: IOperand, right: IOperand) => new _Mul(left,right);

const {value} = Add(1,Mul(5,2));

console.log(value)