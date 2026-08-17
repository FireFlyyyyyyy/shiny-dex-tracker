-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nameFr" TEXT,
    "generation" INTEGER NOT NULL,
    "spriteUrl" TEXT NOT NULL,
    "shinySpriteUrl" TEXT NOT NULL,
    "homeSpriteUrl" TEXT,
    "homeShinySpriteUrl" TEXT,
    "evolutionChainId" INTEGER,
    "types" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShinyCatch" (
    "id" TEXT NOT NULL,
    "caughtAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "game" TEXT,
    "method" TEXT,
    "resets" INTEGER,
    "userId" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "ShinyCatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HuntedGeneration" (
    "id" TEXT NOT NULL,
    "generationId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HuntedGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- CreateIndex
CREATE INDEX "Pokemon_generation_idx" ON "Pokemon"("generation");

-- CreateIndex
CREATE INDEX "Pokemon_evolutionChainId_idx" ON "Pokemon"("evolutionChainId");

-- CreateIndex
CREATE INDEX "ShinyCatch_userId_idx" ON "ShinyCatch"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShinyCatch_userId_pokemonId_key" ON "ShinyCatch"("userId", "pokemonId");

-- CreateIndex
CREATE INDEX "HuntedGeneration_userId_idx" ON "HuntedGeneration"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HuntedGeneration_userId_generationId_key" ON "HuntedGeneration"("userId", "generationId");

-- AddForeignKey
ALTER TABLE "ShinyCatch" ADD CONSTRAINT "ShinyCatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShinyCatch" ADD CONSTRAINT "ShinyCatch_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HuntedGeneration" ADD CONSTRAINT "HuntedGeneration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
