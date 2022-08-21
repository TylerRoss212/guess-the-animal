export class Animal {
    private id: Number;
    public name: String;
    private classification: String;

    constructor(id: Number, name: String, classification: String) {
        this.id = id;
        this.name = name;
        this.classification = classification;
    }
}