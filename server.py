from flask import Flask, request, redirect, render_template, url_for

app = Flask(__name__, static_folder="static")


@app.route('/')
@app.route('/index')
def main_page():
    return render_template('index.html')


@app.route('/snake')
def snake_game():
    return render_template('snake.html')


@app.route('/memory')
def memory_game():
    pass


@app.route('/puzzle')
def puzzle_game():
    directory = "cat"
    return render_template('puzzle.html', directory=directory)


if __name__ == "__main__":
    app.run(host='127.0.0.1',
            port=5050)
