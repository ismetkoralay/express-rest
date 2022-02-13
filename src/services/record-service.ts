import { Record } from "../models/record";
import { RecordResponse } from "../models/record-reponse";

interface RecordService {
    get(startDate: Date, endDate: Date, minCount: number, maxCount: number): Promise<RecordResponse[]>;
}

class RecordServiceImpl implements RecordService {

    async get(startDate: Date, endDate: Date, minCount: number, maxCount: number): Promise<RecordResponse[]> {

        const result = await Record.aggregate([
            {
                $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } }
            },
            {
                $group: {
                    _id: "$_id",
                    key: { $first: "$key" },
                    value: { $first: "$value" },
                    createdAt: { $first: "$createdAt" },
                    c: { $push: "$counts" }
                }
            },
            {
                $unwind: "$c"
            },
            {
                $unwind: "$c"
            },
            {
                $group: {
                    _id: "$_id",
                    key: { $first: "$key" },
                    value: { $first: "$value" },
                    createdAt: { $first: "$createdAt" },
                    c: { $sum: "$c" }
                }
            },
            {
                $match: { c: { $gte: minCount, $lte: maxCount } }
            }
        ]);

        const response: RecordResponse[] = result.map(x => {
            const t = {
                key: x.key,
                createdAt: x.createdAt,
                totalCount: x.c
            };

            return t;
        });

        return response;
    }

}

const recordService = new RecordServiceImpl();
export { recordService };