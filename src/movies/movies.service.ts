import {Injectable, NotFoundException} from '@nestjs/common';
import {Movie} from "./entities/movie.entity";

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        const movie = this.movies.find(m => m.id === +id);
        if (!movie) {
            throw new NotFoundException(`movie with ${id} not found.. `)
        }
        return movie;
    }

    create(data) {
        this.movies.push({
            id: this.movies.length + 1,
            ...data
        })
    }

    update(id: string, data) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...data})
    }

    deleteOne(id: string) {
        this.getOne(id);
        this.movies = this.movies.filter(m => m.id !== +id);
    }
}
