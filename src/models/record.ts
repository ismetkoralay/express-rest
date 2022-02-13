import mongoose from "mongoose";

interface RecordAttrs {
    key: string;
    value: string;
    createdAt: Date;
    counts: number[];
}

interface RecordModel extends mongoose.Model<RecordDoc> {
    build(attrs: RecordAttrs): RecordDoc;
}

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
        type: mongoose.Schema.Types.Array,
        required: true
    }
});

recordSchema.statics.build = (attrs: RecordAttrs) => {
    return new Record(attrs);
};

const Record = mongoose.model<RecordDoc, RecordModel>('Record', recordSchema);

export { Record };