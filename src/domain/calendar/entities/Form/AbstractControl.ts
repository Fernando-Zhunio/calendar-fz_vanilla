export abstract class AbstractControl {
    abstract getValue(): any;
    abstract setValue(value: any): void;
    abstract init(arg?: any): void;
}