-- CreateTable
CREATE TABLE "IngredientRequest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "measure" "Measure" NOT NULL,

    CONSTRAINT "IngredientRequest_pkey" PRIMARY KEY ("id")
);
