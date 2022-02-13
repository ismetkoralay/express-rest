import request from "supertest";
import { app } from "../../app";
import { RecordResponse } from "../../models/record-reponse";

jest.mock("../../services/record-service", () => {
    return {
        recordService: {
            get: jest.fn().mockImplementation((startDate: string, endDate: string, minCount: number, maxCount: number): RecordResponse[] => {
                if (startDate === "2021-01-01" && endDate === "2022-01-01" && minCount === 0 && maxCount === 1000) {
                    return [
                        { key: "key-1", createdAt: new Date("2021-05-01"), totalCount: 500 }
                    ]
                } else if (startDate === "2020-01-01" && endDate === "2021-01-01" && minCount === 2000 && maxCount === 3000) {
                    return [
                        { key: "key-1", createdAt: new Date("2020-05-01"), totalCount: 2500 },
                        { key: "key-1", createdAt: new Date("2020-09-01"), totalCount: 2700 }
                    ]
                } else if (startDate === "2019-01-01" && endDate === "2020-01-01" && minCount === 2000 && maxCount === 3000) {
                    return [];
                }

                return [];
            })
        }
    }
});

it("should return 400 if format of startDate is not valid", async () => {

    await request(app)
        .post("/api/v1")
        .send({
            startDate: "2022-31-01",
            endDate: "2022-02-10",
            minCount: 0,
            maxCount: 100
        }).expect(400);
});

it("should return 400 if format of endDate is not valid", async () => {

    await request(app)
        .post("/api/v1")
        .send({
            startDate: "2022-01-01",
            endDate: "2022-31-10",
            minCount: 0,
            maxCount: 100
        }).expect(400);
});

it("should return 400 if minCount less than 0", async () => {

    await request(app)
        .post("/api/v1")
        .send({
            startDate: "2021-01-01",
            endDate: "2022-01-10",
            minCount: -5,
            maxCount: 100
        }).expect(400);
});

it("should return 400 if maxCount less than 0", async () => {

    await request(app)
        .post("/api/v1")
        .send({
            startDate: "2021-01-01",
            endDate: "2022-01-10",
            minCount: 0,
            maxCount: -5
        }).expect(400);
});

it("should return 400 if maxCount less than minCount", async () => {

    await request(app)
        .post("/api/v1")
        .send({
            startDate: "2021-01-01",
            endDate: "2022-01-10",
            minCount: 100,
            maxCount: 50
        }).expect(400);
});

it("should return 200 if input fields are valid", async () => {

    await request(app)
        .post("/api/v1")
        .send({
            startDate: "2021-01-01",
            endDate: "2022-01-10",
            minCount: 0,
            maxCount: 100
        }).expect(200);
});

it("should return 200 and an array of 1 element when there is 1 element that matches with conditions", async () => {

    const response = await request(app)
        .post("/api/v1")
        .send({
            startDate: "2021-01-01",
            endDate: "2022-01-01",
            minCount: 0,
            maxCount: 1000
        });

    expect(response.status).toEqual(200);
    const data = response.body;
    expect(data.code).toEqual(0);
    expect(data.msg).toEqual("Success");
    expect(data.records.length).toEqual(1);
});

it("should throw error if there is no matching endpoint", async () => {

    await request(app)
        .post("/invalid")
        .send({})
        .expect(500);
})

// it("should return 400 if format of endDate is not valid", async () => {

//     await request(app)
//         .post("/api/v1")
//         .send({
//             startDate: "2022-01-01",
//             endDate: "2022-31-10",
//             minCount: 0,
//             maxCount: 100
//         }).expect(400);
// });