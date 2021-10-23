import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { NotFoundException } from "@nestjs/common";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService]
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: "test movie",
      year: 1999,
      genres: ["test"]
    });
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404", () => {
      try {
        service.getOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      const beforeDeleteService = service.getAll().length;
      service.deleteOne(1);

      const afterDeleteService = service.getAll().length;
      expect(afterDeleteService).toBeLessThan(beforeDeleteService);
    });

    it("should return 404", () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("should create movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "test movie 2",
        year: 2000,
        genres: ["test2"]
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("should update movie", () => {
      service.update(1, { title: "update movie" });

      const movie = service.getOne(1);
      expect(movie.title).toEqual("update movie");
    });

    it("should return 404", () => {
      try {
        service.update(9999, { title: "update movie" });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
