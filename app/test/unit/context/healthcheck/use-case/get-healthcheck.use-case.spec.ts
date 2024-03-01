import { HealthcheckModule } from "@app/context/healthcheck/healthcheck.module";
import { Test, TestingModule } from "@nestjs/testing";
import { GetHealthcheckStatusUseCase } from "@app/context/healthcheck/use-case";

process.env.HOSTNAME = "testing";

describe("[Healthcheck] GetHealthcheck UseCase", () => {
  let getHealthcheckUseCase: GetHealthcheckStatusUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthcheckModule],
    }).compile();

    getHealthcheckUseCase = module.get<GetHealthcheckStatusUseCase>(GetHealthcheckStatusUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a current healthcheck status", async () => {
    const result = await getHealthcheckUseCase.get();

    expect(result).toEqual({
      status: 200,
    });
  });
});
