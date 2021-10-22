import {Controller, Delete, Get, Param, Post, Patch, Body, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'all movies'
    }

    @Get("/search")
    search(@Query("year") searchYear: string) {
        return `search movie - ${searchYear}`
    }

    @Get("/:id")
    getOne(@Param("id") mId: string) {
        return `one movie - ${mId}`
    }

    @Post()
    create(@Body() mData) {
        console.log(mData)
        return 'create movie'
    }

    @Patch("/:id")
    path(@Param("id") mId: string, @Body() mData) {
        return {
            updateMovie: mId,
            ...mData
        }
    }

    @Delete("/:id")
    remove(@Param("id") mId: string) {
        return `remove movie - ${mId}`
    }
}
