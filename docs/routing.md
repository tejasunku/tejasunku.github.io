# Routing Table

| Host                                      | Path     | Handler           | Notes               |
| ----------------------------------------- | -------- | ----------------- | ------------------- |
| [www.example.com](http://www.example.com) | /        | Astro (static)    | veil                |
| [www.example.com](http://www.example.com) | /rooms/* | Astro (static)    | rooms from markdown |
| [www.example.com](http://www.example.com) | /api/*   | (later) Edge func | streaming proxy     |