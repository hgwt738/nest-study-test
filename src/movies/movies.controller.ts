import {Controller, Delete, Get, Param, Post, Patch, Body, Query} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {Movie} from "./entities/movie.entity";

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") mId: string): Movie {
        return this.moviesService.getOne(mId);
    }

    @Post()
    create(@Body() mData) {
        return this.moviesService.create(mData);
    }

    @Patch("/:id")
    path(@Param("id") mId: string, @Body() mData) {
        return this.moviesService.update(mId, mData)
    }

    @Delete("/:id")
    remove(@Param("id") mId: string) {
        return this.moviesService.deleteOne(mId);
    }
}
