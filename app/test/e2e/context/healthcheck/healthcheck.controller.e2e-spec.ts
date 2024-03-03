import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@app/app.module";

describe("[Healthcheck] HealthcheckController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterEach(() => jest.resetAllMocks());
  afterAll(async () => await app.close());

  describe("/_healthcheck", () => {
    describe("GET /_healthcheck", () => {
      it("should respond as healthy", async () => {
        await request(app.getHttpServer()).get("/_healthcheck").expect(200);
      });
    });
  });
});
