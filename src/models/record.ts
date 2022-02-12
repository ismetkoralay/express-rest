import mongoose from "mongoose";

// An interface that describes the properties that are required to create a new user
interface RecordAttrs {
    key: string;
    value: string;
    createdAt: Date;
    counts: number[];
}

// An interface that describes the properties that a User model has
interface RecordModel extends mongoose.Model<RecordDoc> {
    build(attrs: RecordAttrs): RecordDoc;
}

//An interface that describes the properties that a User document has
interface RecordDoc extends mongoose.Document {
    key: string;
    value: string;
    createdAt: Date;
    counts: number[];
}

const recordSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    counts: {
        type: mongoose.Schema.Types.Array
    }
});

recordSchema.statics.build = (attrs: RecordAttrs) => {
    return new Record(attrs);
};

const Record = mongoose.model<RecordDoc, RecordModel>('Record', recordSchema);

export { Record };