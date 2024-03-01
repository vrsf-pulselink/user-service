import { Test, TestingModule } from "@nestjs/testing";
import { HealthcheckController } from "@app/context/healthcheck/controller";
import { HealthcheckModule } from "@app/context/healthcheck/healthcheck.module";

describe("[Healthcheck] Healthcheck Controller", () => {
  let healthcheckController: HealthcheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthcheckModule],
    })
      .useMocker((token) => token)
      .compile();

    healthcheckController = module.get<HealthcheckController>(HealthcheckController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(healthcheckController).toBeDefined();
  });

  // It("should return a current status of the application", async () => {
  //   await healthcheckController.get();
  //
  //   // expect(queryBus.execute).toHaveBeenCalledWith(new GetHealthcheckStatusUseCase());
  //   // expect(queryBus.execute).toHaveReturnedWith({
  //   //   hostname: "testing",
  //   //   status: 200,
  //   // });
  // });
});
