class DataResModel {
    constructor(other) {
        this.id = other.id;
        this.name = other.name;
    }
}

class DataEntityModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export { DataResModel, DataEntityModel };