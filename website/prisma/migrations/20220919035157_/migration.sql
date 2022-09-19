-- CreateTable
CREATE TABLE "adl_activity_data" (
    "id" BIGSERIAL NOT NULL,
    "activity" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_source" TEXT,
    "sound_source" TEXT,
    "motion_source" TEXT,
    "comment_source" TEXT,

    CONSTRAINT "adl_activity_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "adl_activity_data_activity_idx" ON "adl_activity_data"("activity");
