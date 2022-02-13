import { recordService } from "../record-service";
import { Record } from "../../models/record";

const insertSomeData = async () => {
    const record1 = Record.build({ key: "key-1", value: "value-1", createdAt: new Date("2015-11-28T11:47:29.706Z"), counts: [864, 509, 712] });
    await record1.save();

    const record2 = Record.build({ key: "key-2", value: "value-2", createdAt: new Date("2016-12-27T03:12:14.477Z"), counts: [2, 1340, 651] });
    await record2.save();

    const record3 = Record.build({ key: "key-3", value: "value-3", createdAt: new Date("2015-03-05T12:16:12.862Z"), counts: [991, 1955, 797] });
    await record3.save();

    const record4 = Record.build({ key: "key-4", value: "value-4", createdAt: new Date("2015-10-14T08:43:13.661Z"), counts: [854, 1793, 127] });
    await record4.save();
}

it("should return empty array when there is no record", async () => {
    const response = await recordService.get(new Date("2014-01-01"), new Date("2022-02-02"), 0, 1000);
    expect(response.length).toEqual(0);
});

it("should return an array with 1 element when the given conditions matches with 1 record", async () => {
    await insertSomeData();

    const response = await recordService.get(new Date("2016-12-01"), new Date("2016-12-31"), 1500, 2000);
    expect(response.length).toEqual(1);

    const data = response[0];
    expect(data.key).toEqual("key-2");
    expect(data.totalCount).toEqual(1993);
    expect(data.createdAt).toEqual(new Date("2016-12-27T03:12:14.477Z"));
});

it("should return an empty array when date conditions match but count does not", async () => {
    await insertSomeData();

    const response = await recordService.get(new Date("2016-12-01"), new Date("2016-12-31"), 3000, 4000);
    expect(response.length).toEqual(0);
});

it("should return an empty array when count conditions match but date does not", async () => {
    await insertSomeData();

    const response = await recordService.get(new Date("2020-12-01"), new Date("2021-12-31"), 1000, 4000);
    expect(response.length).toEqual(0);
});

it("should return an array with 2 elements when the given conditions match with 2 records", async () => {
    await insertSomeData();

    const response = await recordService.get(new Date("2015-09-01"), new Date("2015-12-31"), 0, 4000);
    expect(response.length).toEqual(2);

    // const sorted = response.sort((a, b) => a.totalCount > b.totalCount ? 1 : 0);

    // const data = sorted[0];
    // expect(data.key).toEqual("key-1");
    // expect(data.totalCount).toEqual(2085);
    // expect(data.createdAt).toEqual(new Date("2015-11-28T11:47:29.706Z"));

    // const data2 = sorted[1];
    // expect(data2.key).toEqual("key-4");
    // expect(data2.totalCount).toEqual(2774);
    // expect(data2.createdAt).toEqual(new Date("2015-10-14T08:43:13.661Z"));
});

// Although validator checks the format of input dates, I just added a check if service works properly.
it("should return an empty array when the date format is invalid", async() => {
    const response = await recordService.get(new Date("2015-31-01"), new Date("2015-31-02"), 0, 4000);
    expect(response.length).toEqual(0);
})