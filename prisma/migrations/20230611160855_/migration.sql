/*
  Warnings:

  - A unique constraint covering the columns `[symbolId]` on the table `QuestionType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `questiontype` ADD COLUMN `symbolId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `QuestionType_symbolId_key` ON `QuestionType`(`symbolId`);

-- AddForeignKey
ALTER TABLE `QuestionType` ADD CONSTRAINT `QuestionType_symbolId_fkey` FOREIGN KEY (`symbolId`) REFERENCES `Picture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
