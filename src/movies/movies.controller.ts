import {Controller, Delete, Get, Param, Post, Patch, Body, Query} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {Movie} from "./entities/movie.entity";
import {CreateMovieDto} from "./dto/create-movie-dto";
import {UpdateMovieDto} from "./dto/update-movie-dto";

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") mId: number): Movie {
        return this.moviesService.getOne(mId);
    }

    @Post()
    create(@Body() mData: CreateMovieDto) {
        return this.moviesService.create(mData);
    }

    @Patch("/:id")
    path(@Param("id") mId: number, @Body() mData: UpdateMovieDto) {
        return this.moviesService.update(mId, mData)
    }

    @Delete("/:id")
    remove(@Param("id") mId: number) {
        return this.moviesService.deleteOne(mId);
    }
}
