-- CreateTable
CREATE TABLE `Wpis` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `tekst` VARCHAR(191) NOT NULL,
    `kategoriaID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kategoria_nazwa_key`(`nazwa`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `tekst` VARCHAR(191) NOT NULL,
    `wpisID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaID_fkey` FOREIGN KEY (`kategoriaID`) REFERENCES `Kategoria`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_wpisID_fkey` FOREIGN KEY (`wpisID`) REFERENCES `Wpis`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
