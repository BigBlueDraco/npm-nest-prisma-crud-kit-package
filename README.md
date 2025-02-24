# nest-prisma-crud-kit 🚀

[![npm version](https://badge.fury.io/js/nest-prisma-crud-kit.svg)](https://badge.fury.io/js/nest-prisma-crud-kit)

Simplify and accelerate CRUD service development in your NestJS applications using Prisma with `nest-prisma-crud-kit`. This package leverages object-oriented principles, including inheritance and abstractions, to minimize boilerplate code and enhance maintainability.

## Features ✨

- **Rapid CRUD Development:** Drastically reduce the time spent creating standard CRUD services. ⏱️
- **Base Abstraction:** Provides `BasePrismaCrudService` and `BasePrismaCrudWithFileService` abstract classes for reusable CRUD logic. 🏗️
- **Extensibility:** Easily extend base classes to add custom functionality, like file handling. 📂
- **Built-in Pagination:** Includes robust pagination support for efficient data retrieval. 📄
- **Standardized DTOs:** Provides base DTOs and interfaces for consistent data handling. 📝
- **Flexible Sorting:** Allows customization of sort order for query results. 🔄

## Installation 📦

```bash
npm install nest-prisma-crud-kit
```

## Prerequisites ⚙️

Before using `nest-prisma-crud-kit`, ensure you have Prisma configured in your NestJS project. If not, follow these steps:

1.  **Install Prisma CLI and Client:**

    ```bash
    npm i -D prisma
    npm install @prisma/client
    ```

2.  **Initialize Prisma:**

    ```bash
    npx prisma init
    ```

## Usage 🛠️

1.  **Inject model in to Module:**

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { UserService } from './user.service';

@Module({
  providers: [
    // inject model name here
    {
      provide: 'model',
      useValue: 'user',
    },
    BasePrismaCrudService,
    // Rest of your code
  ],
  imports: [PrismaModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
```

2.  **Create a Service:**

    ```typescript
    import { Injectable } from '@nestjs/common';
    import { PrismaService } from 'src/prisma/prisma.service';
    import { BasePrismaCrudService } from 'nest-prisma-crud-kit';
    import {
      User,
      UserCreateDto,
      UserUpdateDto,
      UserFindManyDto,
      UserFindOneDto,
      UserDeleteDto,
    } from './user.dto';

    @Injectable()
    export class UserService extends BasePrismaCrudService<
      User,
      UserCreateDto,
      UserFindManyDto,
      UserFindOneDto,
      UserDeleteDto,
      UserUpdateDto
    > {
      constructor(protected prisma: PrismaService) {
        super(prisma, 'user'); // 'user' is the Prisma model name
      }
    }
    ```

3.  **Create DTOs (e.g., `user.dto.ts`):**

    ```typescript
    import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
    import { IsString, IsOptional, IsNumber } from 'class-validator';
    import { FindManyDto } from 'nest-prisma-crud-kit';

    export class User {
      id: string;
      name: string;
      email: string;
    }

    // ... (UserCreateDto, UserUpdateDto, UserFindOneDto, UserDeleteDto, UserFindManyDto)
    ```

4.  **Using the Service in a Controller:**

    ```typescript
    import {
      Controller,
      Get,
      Post,
      Body,
      Param,
      Put,
      Delete,
      Query,
    } from '@nestjs/common';
    import { UserService } from './user.service';
    import {
      UserCreateDto,
      UserUpdateDto,
      UserFindManyDto,
      UserFindOneDto,
      UserDeleteDto,
    } from './user.dto';
    import { PaginationDto } from 'nest-prisma-crud-kit';

    @Controller('users')
    export class UserController {
      constructor(private readonly userService: UserService) {}

      @Post()
      create(@Body() createUserDto: UserCreateDto) {
        return this.userService.create(createUserDto);
      }

      @Get()
      async findAll(
        @Query() query: UserFindManyDto,
      ): Promise<PaginationDto<any>> {
        // ... (Pagination logic)
      }

      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.userService.findOne({ id });
      }

      @Put(':id')
      update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto) {
        return this.userService.update({ where: { id }, data: updateUserDto });
      }

      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.userService.delete({ id });
      }
    }
    ```

## Contributing 🤝

Contributions are welcome\! Please feel free to submit pull requests or open issues to improve this package.

<!-- ## License 📄 -->

<!-- [MIT](https://www.google.com/url?sa=E&source=gmail&q=LICENSE) -->
