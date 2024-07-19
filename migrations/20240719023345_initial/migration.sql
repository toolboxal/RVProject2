-- CreateTable
CREATE TABLE "Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL
);
