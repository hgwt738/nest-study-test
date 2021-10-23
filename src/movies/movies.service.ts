import {Injectable, NotFoundException} from '@nestjs/common';
import {Movie} from "./entities/movie.entity";
import {CreateMovieDto} from "./dto/create-movie-dto";
import {UpdateMovieDto} from "./dto/update-movie-dto";

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        const movie = this.movies.find(m => m.id === id);
        if (!movie) {
            throw new NotFoundException(`movie with ${id} not found.. `)
        }
        return movie;
    }

    create(data: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...data
        })
    }

    update(id: number, data: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...data})
    }

    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter(m => m.id !== +id);
    }
}
